FROM node:22.11.0 AS builder

# Definir diretório de trabalho no container
WORKDIR /app/frontend

# Copiar package.json e package-lock.json para o container
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Expor a porta usada pelo Next.js
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD npm run dev