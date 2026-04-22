<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResourse;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return CategoryResourse::collection($category);
        
    }

   
}
