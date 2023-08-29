FROM node:20-alpine

RUN apk upgrade -v

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]