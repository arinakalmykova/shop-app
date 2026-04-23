<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Смартфоны', 'description' => 'Мобильные телефоны и флагманские устройства'],
            ['name' => 'Ноутбуки', 'description' => 'Портативные компьютеры для учебы, работы и игр'],
            ['name' => 'Аксессуары', 'description' => 'Полезные дополнения для техники'],
            ['name' => 'Планшеты', 'description' => 'Планшеты для работы, учебы и развлечений'],
            ['name' => 'Аудио', 'description' => 'Наушники, колонки и аудиоустройства'],
            ['name' => 'Мониторы', 'description' => 'Мониторы для дома, офиса и игр'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']],
                ['description' => $category['description']]
            );
        }
    }
}
