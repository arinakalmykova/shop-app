#!/bin/sh
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

mkdir -p bootstrap/cache database storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views

composer install --no-interaction --prefer-dist

if ! grep -q '^APP_KEY=base64:' .env; then
    php artisan key:generate --force --no-interaction
fi

php artisan config:clear

if [ "$DB_CONNECTION" = "pgsql" ]; then
    until php -r '$dsn = "pgsql:host=" . getenv("DB_HOST") . ";port=" . getenv("DB_PORT") . ";dbname=" . getenv("DB_DATABASE"); new PDO($dsn, getenv("DB_USERNAME"), getenv("DB_PASSWORD"));' >/dev/null 2>&1; do
        echo "Waiting for PostgreSQL..."
        sleep 2
    done
fi

php artisan migrate --force
php artisan db:seed --class=UserSeeder --force

PRODUCT_COUNT=$(php -r 'require "vendor/autoload.php"; $app = require "bootstrap/app.php"; $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap(); echo App\Models\Product::count();')

if [ "$PRODUCT_COUNT" -eq 0 ]; then
    php artisan db:seed --class=ProductSeeder --force
fi

php artisan serve --no-reload --host=0.0.0.0 --port=8000
