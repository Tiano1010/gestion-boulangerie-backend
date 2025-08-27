<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'Viennoiseries']);
        Category::create(['name' => 'Pâtisseries']);
        Category::create(['name' => 'Boissons']);
    }
}
