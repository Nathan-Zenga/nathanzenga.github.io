# Install dependencies only when needed
FROM node:23-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

# RUN npm install --frozen-lockfile
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1

ARG DB

RUN npm run build

# Production image, copy all the files and run next
FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs --from=builder /app ./

USER nextjs

CMD ["npm", "run", "start"]
