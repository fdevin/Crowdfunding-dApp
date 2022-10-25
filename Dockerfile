FROM node:16-alpine
WORKDIR /app
COPY . .

#===== build ======#

RUN npm ci

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build" ]
