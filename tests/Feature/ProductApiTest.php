<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login()
    {
        User::create([
            "name" => "Admin2",
            "email" => "admin2@example.com",
            "password" => Hash::make("password"),
        ]);

        $response = $this->postJson('/api/login', [
            "email" => "admin2@example.com",
            "password" => "password",
        ]);

        $response->assertStatus(200)->assertJsonStructure(['token', 'user']);
    }

    public function test_authenticated_admin_can_create_product()
    {
        $user = User::create([
            "name" => "Admin2",
            "email" => "admin2@example.com",
            "password" => Hash::make("password"),
        ]);

        $token = $user->createToken("test")->plainTextToken;

        $category = Category::create([
            "name" => "Смартфоны",
            "description" => "Мобильные телефоны и флагманские устройства",
        ]);

        $response = $this->withHeader("Authorization", "Bearer $token")->postJson("/api/products", [
            "name" => "Samsung",
            "category_id" => $category->id,
            "description" => "Телефон Samsung",
            "price" => "99000",
        ]);
        $response->assertStatus(201)->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'name',
                'description',
                'price',
                'category_id',
                'category',
            ],
        ]);
        $this->assertDatabaseHas("products", [
            "name" => "Samsung",
            "category_id" => $category->id,
        ]);
    }

    public function test_guest_cannot_create_product()
    {
        $category = Category::create([
            "name" => "Смартфоны",
            "description" => "Мобильные телефоны и флагманские устройства",
        ]);

        $response = $this->postJson("/api/products", [
            "name" => "Samsung",
            "category_id" => $category->id,
            "description" => "Телефон Samsung",
            "price" => "99000",
        ]);
        $response->assertStatus(401);
    }

    public function test_product_validation_fails_with_invalid_data()
    {
        $user = User::create([
            "name" => "Admin2",
            "email" => "admin2@example.com",
            "password" => Hash::make("password"),
        ]);

        $token = $user->createToken("test")->plainTextToken;

        $category = Category::create([
            "name" => "Смартфоны",
            "description" => "Мобильные телефоны и флагманские устройства",
        ]);

        $response = $this->withHeader("Authorization", "Bearer $token")->postJson("/api/products", [
            "name" => "Samsung",
            "category_id" => $category->id,
            "description" => "Телефон Samsung",
            "price" => "-99000",
        ]);
        $response->assertStatus(422);
    }


}
