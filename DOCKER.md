# Docker запуск

## Первый запуск

```bash
docker compose up --build
```

После старта открой:

- Laravel: http://127.0.0.1:8000
- Vite: http://127.0.0.1:5173

Контейнер `app` сам выполнит:

- `composer install`
- создание `database/database.sqlite`
- `php artisan migrate --force`
- создание пользователя `admin@example.com` / `password`
- заполнение товаров, если таблица `products` пустая

## Повторный запуск

```bash
docker compose up
```

## Пересоздать демо-товары

```bash
docker compose run --rm app php artisan db:seed --class=ProductSeeder --force
```

Этот сидер очищает текущие товары и создает 30 демо-товаров.

## Остановить контейнеры

```bash
docker compose down
```
