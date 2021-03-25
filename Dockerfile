FROM node:14.15-alpine AS builder

ARG MODE=development

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY webpack.config.ts .
COPY tsconfig.json .
COPY src src
RUN npm run build -- --mode "$MODE"


FROM nginx:1.19-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
