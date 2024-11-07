# Usa la imagen oficial de Node.js 20.17.0 como base
FROM node:20.17.0-alpine

# Crea y usa un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN npm run build

# Expone el puerto (esto usa el puerto que tu aplicación escucha)
EXPOSE 4000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "start"]