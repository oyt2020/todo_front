# 1단계: 빌드 (Node.js 환경)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 (Nginx 환경)
FROM nginx:stable-alpine
# Vite 빌드 결과물인 dist 폴더를 Nginx 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]