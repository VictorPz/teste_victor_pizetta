FROM php:8.2-fpm

# Instalar dependências do sistema e extensões do PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install zip pdo_mysql

# Instalar o Composer
COPY --from=composer:2.8.3 /usr/bin/composer /usr/bin/composer

# Configurar diretório de trabalho
WORKDIR /app/backend

# Copiar os arquivos do projeto
COPY . .

# Comando padrão para iniciar o servidor (alterando o host para 0.0.0.0)
CMD php artisan serve --host=0.0.0.0 --port=8000

# Expor a porta 8000
EXPOSE 8000