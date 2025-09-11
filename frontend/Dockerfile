# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Etapa de produção
FROM node:20-alpine AS production

WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]