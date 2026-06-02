# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Quieter, lighter, more deterministic npm in CI/headless environments.
# Disables the update-notifier and audit/fund network calls that can stall or
# OOM-kill `npm ci` on constrained build servers ("Exit handler never called!").
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    CI=true

# Install dependencies (all, including devDeps needed for build)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Build Vite frontend → dist/
RUN npm run build

# Compile Express server → server/dist/
RUN npm run build:server

# ── Stage 2: production ────────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    CI=true

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist

# Copy public assets (favicon, fonts, icons)
COPY public ./public

EXPOSE 3001

CMD ["node", "server/dist/index.js"]
