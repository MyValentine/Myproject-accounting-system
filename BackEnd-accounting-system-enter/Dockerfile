FROM node:11.13.0
WORKDIR /backend
COPY package*.json ./
RUN npm install --no-optional && \
    npm cache clean --force
COPY . ./
EXPOSE 3001
CMD [ "node", "server.js" ]