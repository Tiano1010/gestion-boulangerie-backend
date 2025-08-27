<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin1',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('passer123'),
            'role' => 'ADMIN',
            'phone' => '1234567890',
        ]);

        User::create([
            'name' => 'Employe1',
            'email' => 'employe@gmail.com',
            'password' => Hash::make('passer123'),
            'role' => 'EMPLOYEE',
            'phone' => '2345678901',
        ]);

        User::create([
            'name' => 'Client1',
            'email' => 'client@gmail.com',
            'password' => Hash::make('passer123'),
            'role' => 'CLIENT',
            'phone' => '3456789012',
        ]);
    }
}
