FROM node:10
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "node", "entry.js" ]