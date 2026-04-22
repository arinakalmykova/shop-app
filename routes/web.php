<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/product/{id}', function () {
    return Inertia::render('ProductShow');
});

Route::get('/admin/products', function () {
    return Inertia::render('AdminProducts');
});