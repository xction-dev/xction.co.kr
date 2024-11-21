# 베이스 이미지 설정
FROM node:18-alpine AS base

# 의존성 설치 및 빌드 단계
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN corepack enable
RUN yarn
RUN NEXT_PUBLIC_IGNORE_ESLINT=true yarn build

# 실행 단계 1: Client
FROM base AS client
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/client/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/standalone/client ./
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "./server.js"]

# 실행 단계 2: Server
FROM base AS server
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/server/dist ./

RUN --mount=type=secret,id=secret_1 \
    sed -i "s/DB_HOST=/DB_HOST=$(cat /run/secrets/secret_1)/" .env.production
RUN --mount=type=secret,id=secret_2 \
    sed -i "s/DB_USER=/DB_USER=$(cat /run/secrets/secret_2)/" .env.production
RUN --mount=type=secret,id=secret_3 \
    sed -i "s/DB_PASSWORD=/DB_PASSWORD=$(cat /run/secrets/secret_3)/" .env.production
RUN --mount=type=secret,id=secret_4 \
    sed -i "s/DB_DATABASE=/DB_DATABASE=$(cat /run/secrets/secret_4)/" .env.production
RUN --mount=type=secret,id=secret_5 \
    sed -i "s/DB_PORT=/DB_PORT=$(cat /run/secrets/secret_5)/" .env.production

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["node", "./test.js"]