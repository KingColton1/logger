# Node.js bot Dockerfile
FROM node:20-bullseye

ARG buildno
ARG commitsha

ENV NODE_ENV=production


LABEL author="Forked Logger by KingColton1" \ repository="https://github.com/kingcolton1/logger"

RUN mkdir /opt/bot
# Copy files and install modules
COPY *.js /opt/bot/
COPY *.json /opt/bot/
COPY *.md /opt/bot/
COPY src /opt/bot/src
WORKDIR /opt/bot
RUN npm i --production

CMD ["node", "index.js"]
