# Imagen de node.js oficial basada en Alpine Linux para un contenedor ligero
FROM node:18-alpine

# Asignar un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al directorio de trabajo
COPY api/package*.json ./

# Instalar las dependencias necesarias especificadas en package.json
RUN npm install

# Copiar el resto del código de la aplicación desde la carpeta 'api' al directorio de trabajo
COPY api/ .

# Hacer que el puerto 3000 esté disponible para el mundo exterior a este contenedor
EXPOSE 3000

# Definir el comando que usaremos para ejecutar la aplicación
CMD ["node", "index.js"]
