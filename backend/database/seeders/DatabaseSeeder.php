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

        $admin = User::factory()->create([
            'name' => 'Admin RH',
            'email' => 'admin@gmail.com',
            'password' => 'admin000',
            'role' => 'admin',
        ]);
        
        $user1 = User::factory()->create([
            'name' => 'Sami Alami',
            'email' => 'sami.alami@larache.ma',
            'password' => 'password',
            'role' => 'fonctionnaire',
        ]);

        \App\Models\Fonctionnaire::create([
            'user_id' => $user1->id,
            'matricule' => 'MAT882',
            'department' => 'Travaux',
            'position' => 'Technicien 3ème grade',
            'hire_date' => '2022-03-12',
            'salary' => 5500
        ]);

        $user2 = User::factory()->create([
            'name' => 'Nadia Benani',
            'email' => 'nadia.b@larache.ma',
            'password' => 'password',
            'role' => 'fonctionnaire',
        ]);

        \App\Models\Fonctionnaire::create([
            'user_id' => $user2->id,
            'matricule' => 'MAT443',
            'department' => 'Finances',
            'position' => 'Adjoint Administratif 2ème grade',
            'hire_date' => '2021-06-25',
            'salary' => 6200
        ]);
    }
}
