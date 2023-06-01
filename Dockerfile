FROM node:latest as node
WORKDIR /app
EXPOSE 80
EXPOSE 443

#Build app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

#Copy app to nginx
FROM nginx:alpine
COPY --from=node /app/dist/out/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf