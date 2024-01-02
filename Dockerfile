# Stage 1: Build TypeScript
FROM node:18 as builder

WORKDIR /opt/lavamusic/

# Copy package files and install dependencies
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y openssl && \
    npm install && \
    npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Create production image
FROM node:18-slim

ENV NODE_ENV production

WORKDIR /opt/lavamusic/

# Copy compiled code
COPY --from=builder /opt/lavamusic/dist ./dist
COPY --from=builder /opt/lavamusic/src/utils/LavaLogo.txt ./src/utils/LavaLogo.txt
COPY --from=builder /opt/lavamusic/prisma ./prisma

# Copy package files and install dependencies
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y openssl && \
    npm install --only=production && \
    npx prisma generate

CMD [ "node", "dist/index.js" ]
