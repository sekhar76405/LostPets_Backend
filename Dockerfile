FROM node:16.14.2-alpine3.15
WORKDIR aap
COPY . .
RUN npm cache clean -f
RUN npm i

EXPOSE 5000
EXPOSE 5001

CMD [ "node", "index.js" ]
