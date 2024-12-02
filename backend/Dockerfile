FROM php:8.2-fpm

# Instalar dependências do sistema e extensões do PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install zip pdo_mysql

# Configurar diretório de trabalho
WORKDIR /app/backend

# Copiar os arquivos do projeto
COPY . .

# Instalar o Composer
COPY --from=composer:2.8.3 /usr/bin/composer /usr/bin/composer
RUN composer install

# Expor a porta 8000
EXPOSE 8000