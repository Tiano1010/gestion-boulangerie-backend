<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Address;

class AddressesTableSeeder extends Seeder
{
    public function run(): void
    {
        // Adresse pour le client 1
        Address::create([
            'user_id' => 3, // Client1
            'label' => 'Maison',
            'street' => '123 Rue Principale',
            'city' => 'Dakar',
            'postal_code' => '10000',
            'country' => 'Sénégal',
        ]);

        // Adresse pour l'employé
        Address::create([
            'user_id' => 2, // Employe1
            'label' => 'Travail',
            'street' => '45 Avenue des Fleurs',
            'city' => 'Dakar',
            'postal_code' => '11000',
            'country' => 'Sénégal',
        ]);
    }
}
