FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4646

EXPOSE 4646

CMD ["npm", "start"]