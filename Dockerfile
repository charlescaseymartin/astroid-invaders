FROM node:20-alpine AS builder
WORKDIR /build
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /build/package.json ./
COPY --from=builder /build/dist ./dist
RUN npm install --omit=dev
EXPOSE 8000
CMD ["npm", "run", "start"]
