<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promotion;

class PromotionsTableSeeder extends Seeder
{
    public function run(): void
    {
        $promo = Promotion::create([
            'title' => 'Promo Petit Déjeuner',
            'description' => '10% sur tous les croissants',
            'discount' => 10,
            'type' => 'PERCENT',
            'start_at' => '2025-08-24 00:00:00',
            'end_at' => '2025-08-31 23:59:59',
            'active' => true,
        ]);

        // Associer les produits (IDs 1 et 2)
        $promo->products()->sync([1, 2]);
    }
}
