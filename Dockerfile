# syntax=docker/dockerfile:1
# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Headless-friendly npm: no update-notifier / audit / fund network chatter.
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_PROGRESS=false \
    CI=true

COPY package.json package-lock.json ./

# Single, memory-frugal, network-resilient install. This is the ONLY `npm ci`.
# - maxsockets=1: extract one tarball at a time → lowest possible peak memory
#   (the "Exit handler never called!" crash is npm being OOM-killed during the
#   concurrent reify phase on a busy build host).
# - generous fetch timeouts/retries: survive a slow/stalled registry.
# - cache mount: persist ~/.npm across builds so retries resume instead of
#   re-downloading everything.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund \
      --maxsockets=1 \
      --fetch-timeout=600000 \
      --fetch-retries=5 \
      --fetch-retry-mintimeout=20000 \
      --fetch-retry-maxtimeout=120000

# Copy source and build
COPY . .
RUN npm run build          # Vite frontend → dist/
RUN npm run build:server   # Express server → server/dist/

# Strip devDependencies in place (local prune, no network).
RUN npm prune --omit=dev

# ── Stage 2: production ────────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Reuse the already-installed, dev-pruned modules from the builder.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist

# Static assets (favicon, fonts, icons)
COPY --from=builder /app/public ./public

EXPOSE 3001

CMD ["node", "server/dist/index.js"]
