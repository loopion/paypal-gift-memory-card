# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Quieter, lighter, more deterministic npm in CI/headless environments.
# - update-notifier / audit / fund: skip network calls that can stall the install
# - maxsockets 3: cap concurrent downloads+extractions to keep peak memory low,
#   which prevents the OOM-kill that surfaces as "Exit handler never called!" on
#   small build servers.
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_MAXSOCKETS=3 \
    CI=true

# Install ALL dependencies (devDeps are needed to build). This is the ONLY
# `npm ci` in the whole image — the production stage reuses these modules, so we
# never run two installs in parallel.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --maxsockets 3

# Copy source and build
COPY . .
RUN npm run build          # Vite frontend → dist/
RUN npm run build:server   # Express server → server/dist/

# Strip devDependencies in place so node_modules is production-ready (no install,
# just a local prune — no network, no extra memory pressure).
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
