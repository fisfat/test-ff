FROM node:10
WORKDIR /src/app
COPY . .
RUN npm install
EXPOSE 6796
ENV NODE_ENV=production
CMD [ "node", "entry.js" ]