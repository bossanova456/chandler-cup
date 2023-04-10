FROM node:19-alpine

RUN apt update && apt upgrade -y

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]