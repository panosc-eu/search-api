FROM node:13-alpine
EXPOSE 3000
WORKDIR /usr/src/app/
COPY package.json /usr/src/app/
COPY . /usr/src/app/
RUN npm install
COPY CI/ESS/configuration.ts /usr/src/app/src/providers/scicat-provider/repository/configuration.ts
RUN npm run compile
ENV NODE_ENV=production
RUN npm prune
WORKDIR /usr/src/app/dist/
CMD ["node", "index.js"]
