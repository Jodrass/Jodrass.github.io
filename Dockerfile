FROM node:20-alpine AS builder

WORKDIR /app

# Archivos de configuración
COPY package*.json ./
RUN npm ci

# Resto de archivos fuente
COPY . .
RUN npm run build

# Etapa 2: Nginx para servir estaticos
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos la configuración genérica para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
