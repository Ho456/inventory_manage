<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;

Route::prefix('v1')->group(function () {
    // Dashboard routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/reports', [DashboardController::class, 'reports']);
    
    // Product routes
    Route::apiResource('products', ProductController::class);
    Route::get('/products/low-stock/list', [ProductController::class, 'lowStock']);
    Route::patch('/products/{product}/stock', [ProductController::class, 'updateStock']);
    
    // Category routes
    Route::apiResource('categories', CategoryController::class);
});