# ── Stage 1: build ────────────────────────────────────────────────────────────
# Debian (glibc), NOT alpine (musl): native deps such as rolldown (Vite 8's
# bundler) ship broken/missing prebuilt binaries for the amd64+musl combo, which
# crashed `npm ci` ("Exit handler never called!") on every amd64 host. glibc has
# first-class native-binary support. Full image (not -slim) so node-gyp has a
# toolchain if any package needs to compile.
FROM node:22-bookworm AS builder
WORKDIR /app

ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    CI=true

# Single install; the production stage reuses these modules.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build          # Vite frontend → dist/
RUN npm run build:server   # Express server → server/dist/

# Strip devDependencies in place (local prune, no network).
RUN npm prune --omit=dev

# ── Stage 2: production ────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS production
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
