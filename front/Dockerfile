
FROM node:lts as angular-builder

WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .

RUN npm run build -- --output-path=/dist --configuration=production


# --- Estágio de Servir (Nginx) ---
FROM nginx:alpine

COPY --from=angular-builder /dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exponha a porta padrão do Nginx
EXPOSE 80

# O comando padrão do Nginx já inicia o servidor
CMD ["nginx", "-g", "daemon off;"]