<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->get('category_id'));
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->get('status'));
        }

        // Low stock filter
        if ($request->has('low_stock') && $request->get('low_stock')) {
            $query->lowStock();
        }

        $products = $query->paginate(15);

        return response()->json($products);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'required|string|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'supplier' => 'nullable|string|max:255',
            'reorder_level' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        $product = Product::create($validated);
        $product->load('category');

        return response()->json($product, 201);
    }

    public function show(Product $product): JsonResponse
    {
        $product->load('category');
        return response()->json($product);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'supplier' => 'nullable|string|max:255',
            'reorder_level' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        $product->update($validated);
        $product->load('category');

        return response()->json($product);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function lowStock(): JsonResponse
    {
        $products = Product::with('category')->lowStock()->get();
        return response()->json($products);
    }

    public function updateStock(Request $request, Product $product): JsonResponse
    {
        // Handle both adjustment-based and absolute quantity updates
        if ($request->has('adjustment')) {
            // Handle relative adjustments (+1, -1, etc.)
            $validated = $request->validate([
                'adjustment' => 'required|integer'
            ]);
            
            $newQuantity = max(0, $product->quantity + $validated['adjustment']);
            $product->quantity = $newQuantity;
        } else {
            // Handle absolute quantity updates and legacy action-based updates
            $validated = $request->validate([
                'quantity' => 'required|integer|min:0',
                'action' => 'nullable|in:add,subtract,set'
            ]);

            if (isset($validated['action'])) {
                switch ($validated['action']) {
                    case 'add':
                        $product->quantity += $validated['quantity'];
                        break;
                    case 'subtract':
                        $product->quantity = max(0, $product->quantity - $validated['quantity']);
                        break;
                    case 'set':
                        $product->quantity = $validated['quantity'];
                        break;
                }
            } else {
                // Direct quantity update
                $product->quantity = $validated['quantity'];
            }
        }

        $product->save();
        $product->load('category');

        return response()->json($product);
    }
}