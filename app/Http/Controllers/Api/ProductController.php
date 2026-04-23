<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::with('category')->latest();

        if (request()->filled('category_id')) {
            $query->where('category_id', request('category_id'));
        }

        if (request()->filled('search')) {
            $search = request('search');
            $operator = config('database.default') === 'pgsql' ? 'ilike' : 'like';

            $query->where(function ($query) use ($search, $operator) {
                $query
                    ->where('name', $operator, "%{$search}%")
                    ->orWhere('description', $operator, "%{$search}%");
            });
        }
        if (request()->boolean('checkDeleted')) {
            $query->withTrashed();
        }
        $products = $query->paginate(10)->withQueryString();

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());
        $product->load('category');
        return response()->json([
            "data" => new ProductResource($product),
            "message" => "Product created successfully"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): ProductResource
    {
        $product->load('category');
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        $product->load('category');
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json([
            "message" => "Product deleted successfully",
        ]);
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();

        return response()->json([
            'message' => 'Product restored successfully',
        ]);
    }
}
