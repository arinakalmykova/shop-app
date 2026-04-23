<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            [
                'name' => 'Смартфоны',
                'description' => 'Мобильные телефоны'
            ],
            [
                'name' => 'Ноутбуки',
                'description' => 'Портативные компьютеры'
            ],
            [
                'name' => 'Аксессуары',
                'description' => 'Дополнительные устройства'
            ],
        ]);
    }
}