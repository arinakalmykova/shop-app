<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        Product::insert([
            [
                'name' => 'iPhone 15',
                'description' => 'Apple смартфон',
                'price' => 99900,
                'category_id' => $categories->where('name', 'Смартфоны')->first()->id,
            ],
            [
                'name' => 'Samsung Galaxy S24',
                'description' => 'Samsung смартфон',
                'price' => 89900,
                'category_id' => $categories->where('name', 'Смартфоны')->first()->id,
            ],
            [
                'name' => 'MacBook Air',
                'description' => 'Apple ноутбук',
                'price' => 129900,
                'category_id' => $categories->where('name', 'Ноутбуки')->first()->id,
            ],
            [
                'name' => 'Наушники AirPods',
                'description' => 'Беспроводные наушники',
                'price' => 19900,
                'category_id' => $categories->where('name', 'Аксессуары')->first()->id,
            ],
        ]);
    }
}