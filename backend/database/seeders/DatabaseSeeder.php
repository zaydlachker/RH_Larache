<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin RH',
            'email' => 'admin@gmail.com',
            'password' => 'admin000',
            'role' => 'admin',
        ]);
        
        User::factory()->create([
            'name' => 'Candidat Test',
            'email' => 'candidat@larache.ma',
            'password' => 'password',
            'role' => 'candidat',
        ]);
    }
}
