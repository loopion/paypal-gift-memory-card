# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Install dependencies (all, including devDeps needed for build)
COPY package.json package-lock.json ./
RUN npm ci

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
    NPM_CONFIG_UPDATE_NOTIFIER=false

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist

# Copy public assets (favicon, fonts, icons)
COPY public ./public

EXPOSE 3001

CMD ["node", "server/dist/index.js"]
