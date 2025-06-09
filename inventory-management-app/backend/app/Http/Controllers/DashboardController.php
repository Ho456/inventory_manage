<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $lowStockProducts = Product::lowStock()->count();
        $totalValue = Product::sum(DB::raw('price * quantity'));
        
        $recentProducts = Product::with('category')
            ->latest()
            ->take(5)
            ->get();

        $topCategories = Category::withCount('products')
            ->orderByDesc('products_count')
            ->take(5)
            ->get();

        $lowStockItems = Product::with('category')
            ->lowStock()
            ->take(10)
            ->get();

        return response()->json([
            'stats' => [
                'total_products' => $totalProducts,
                'total_categories' => $totalCategories,
                'low_stock_products' => $lowStockProducts,
                'total_inventory_value' => $totalValue
            ],
            'recent_products' => $recentProducts,
            'top_categories' => $topCategories,
            'low_stock_items' => $lowStockItems
        ]);
    }

    public function reports(): JsonResponse
    {
        // Generate sample sales reports data
        $salesReports = Product::with('category')
            ->get()
            ->map(function($product, $index) {
                return [
                    'id' => $index + 1,
                    'product_name' => $product->name,
                    'product_id' => $product->id,
                    'category' => $product->category ? $product->category->name : 'N/A',
                    'quantity_sold' => rand(1, min($product->quantity, 50)), // Simulate sales
                    'total_revenue' => number_format(rand(100, 5000) / 100, 2), // Simulate revenue
                    'date' => now()->subDays(rand(1, 30))->format('Y-m-d')
                ];
            });

        $productsByCategory = Category::withCount('products')
            ->with(['products' => function($query) {
                $query->selectRaw('category_id, sum(quantity) as total_quantity, sum(price * quantity) as total_value')
                    ->groupBy('category_id');
            }])
            ->get();

        $monthlyStats = Product::selectRaw('
                MONTH(created_at) as month,
                YEAR(created_at) as year,
                COUNT(*) as products_added,
                SUM(quantity) as total_quantity
            ')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month', 'year')
            ->orderBy('month')
            ->get();

        return response()->json([
            'data' => $salesReports, // Main reports data for the frontend
            'products_by_category' => $productsByCategory,
            'monthly_stats' => $monthlyStats
        ]);
    }
}