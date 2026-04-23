<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/product/{product}', function (Product $product) {
    $product->load('category');
    return Inertia::render('ProductShow',['product'=> $product]);
});

Route::get('/admin/products', function () {
    return Inertia::render('AdminProducts');
});

Route::get('/admin/products/create', function () {
    return Inertia::render('ProductCreate');
});

Route::get('/admin/products/{product}/edit', function (Product $product) {
    return Inertia::render('ProductEdit');
});
