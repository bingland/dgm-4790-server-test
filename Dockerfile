FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3535

EXPOSE 3535

CMD ["npm", "start"]