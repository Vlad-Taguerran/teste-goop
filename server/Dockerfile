
FROM node:lts as build


WORKDIR /app

COPY package*.json ./


RUN npm ci


COPY . .

RUN npm run build

EXPOSE 3000

# Comando para iniciar a aplicação
# Use 'node dist/index.js' ou 'npm start' dependendo de como você roda
CMD [ "npm", "start" ]


 FROM node:lts-slim
 WORKDIR /app
 COPY --from=build /app/package.json ./package.json
 COPY --from=build /app/node_modules ./node_modules
 COPY --from=build /app/dist ./dist 
 EXPOSE 3000
 CMD [ "node", "dist/index.js" ]