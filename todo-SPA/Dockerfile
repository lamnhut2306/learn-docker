#1. Build
FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

#2. Serve
FROM nginx:alpine
COPY --from=build /app/dist/todo-SPA/browser /usr/share/nginx/html
EXPOSE 80