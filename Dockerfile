# 베이스 이미지 설정
FROM node:18-alpine AS base

# 의존성 설치 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY ./.yarn ./.yarn
COPY ./client/package.json ./client
RUN corepack enable
RUN yarn install

# 빌드 단계 
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN NEXT_PUBLIC_IGNORE_ESLINT=true yarn build

# 실행 단계
FROM base AS runner
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
