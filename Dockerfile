# Устанавливаем зависимости с использованием pnpm
FROM node:20.11-alpine as dependencies
WORKDIR /app
# Устанавливаем pnpm глобально
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
# Копируем зависимости из предыдущего стейджа
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# Копируем собранное приложение и зависимости
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["pnpm", "start"]