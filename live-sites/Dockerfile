FROM node:alpine
RUN npm install -g http-server
WORKDIR /app
COPY ./src /app
EXPOSE 81
CMD ["http-server", "-p", "81", "-c-1"]