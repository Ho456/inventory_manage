<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class InventorySeeder extends Seeder
{
    public function run()
    {
        // Create categories
        $electronics = Category::create([
            'name' => 'Electronics',
            'description' => 'Electronic devices and accessories',
            'status' => 'active'
        ]);

        $clothing = Category::create([
            'name' => 'Clothing',
            'description' => 'Apparel and fashion items',
            'status' => 'active'
        ]);

        $books = Category::create([
            'name' => 'Books',
            'description' => 'Books and educational materials',
            'status' => 'active'
        ]);

        // Create products
        Product::create([
            'name' => 'iPhone 15',
            'description' => 'Latest iPhone with advanced features',
            'sku' => 'IPH15-001',
            'price' => 999.99,
            'quantity' => 50,
            'category_id' => $electronics->id,
            'supplier' => 'Apple Inc.',
            'reorder_level' => 10,
            'status' => 'active'
        ]);

        Product::create([
            'name' => 'MacBook Pro',
            'description' => '16-inch MacBook Pro with M3 chip',
            'sku' => 'MBP16-001',
            'price' => 2499.99,
            'quantity' => 25,
            'category_id' => $electronics->id,
            'supplier' => 'Apple Inc.',
            'reorder_level' => 5,
            'status' => 'active'
        ]);

        Product::create([
            'name' => 'Wireless Headphones',
            'description' => 'Noise-cancelling wireless headphones',
            'sku' => 'WH-001',
            'price' => 299.99,
            'quantity' => 8, // Low stock for testing
            'category_id' => $electronics->id,
            'supplier' => 'Sony',
            'reorder_level' => 15,
            'status' => 'active'
        ]);

        Product::create([
            'name' => 'Cotton T-Shirt',
            'description' => '100% cotton comfortable t-shirt',
            'sku' => 'TS-001',
            'price' => 29.99,
            'quantity' => 100,
            'category_id' => $clothing->id,
            'supplier' => 'Fashion Co.',
            'reorder_level' => 20,
            'status' => 'active'
        ]);

        Product::create([
            'name' => 'Denim Jeans',
            'description' => 'Classic blue denim jeans',
            'sku' => 'DJ-001',
            'price' => 79.99,
            'quantity' => 75,
            'category_id' => $clothing->id,
            'supplier' => 'Denim World',
            'reorder_level' => 25,
            'status' => 'active'
        ]);

        Product::create([
            'name' => 'Programming Book',
            'description' => 'Learn modern web development',
            'sku' => 'PB-001',
            'price' => 49.99,
            'quantity' => 3, // Low stock for testing
            'category_id' => $books->id,
            'supplier' => 'Tech Publishers',
            'reorder_level' => 10,
            'status' => 'active'
        ]);
    }
}