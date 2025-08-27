<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Croissant',
            'description' => 'Croissant au beurre',
            'price' => 1.5,
            'category_id' => 1,
            'stock' => 100,
        ]);

        Product::create([
            'name' => 'Pain au chocolat',
            'description' => 'Délicieux pain au chocolat',
            'price' => 2,
            'category_id' => 1,
            'stock' => 80,
        ]);

        Product::create([
            'name' => 'Café',
            'description' => 'Café noir chaud',
            'price' => 1.2,
            'category_id' => 3,
            'stock' => 50,
        ]);
    }
}
