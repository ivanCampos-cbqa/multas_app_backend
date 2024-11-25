#base image
FROM node:20.10.0
#Create app directory
WORKDIR /app
#copiamos y pegamos el package json
COPY package*.json ./
#reconstruir modulos de node
RUN npm i
#copiar el resto de archivos del proyecto al direcorio de trabajo
COPY . .
#construir la app
RUN npm run build
#Exponer el puerto
EXPOSE 3000
#correr la app cuando el contenedor se levante (ojo, cuando se levante, no en build time)
CMD ["node","dist/src/app.js"]