#!/bin/sh
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

mkdir -p bootstrap/cache database storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views
touch database/database.sqlite

composer install --no-interaction --prefer-dist

if ! grep -q '^APP_KEY=base64:' .env; then
    php artisan key:generate --force --no-interaction
fi

php artisan config:clear
php artisan migrate --force
php artisan db:seed --class=UserSeeder --force

PRODUCT_COUNT=$(php -r '$pdo = new PDO("sqlite:database/database.sqlite"); echo (int) $pdo->query("select count(*) from products")->fetchColumn();')

if [ "$PRODUCT_COUNT" -eq 0 ]; then
    php artisan db:seed --class=ProductSeeder --force
fi

php artisan serve --host=0.0.0.0 --port=8000
