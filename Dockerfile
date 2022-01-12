FROM node:14-alpine

WORKDIR /app
 
COPY package*.json ./
COPY .babelrc ./

RUN npm install

COPY . .

ENV PORT 3050
EXPOSE $PORT

CMD ["npm", "run", "local"]
