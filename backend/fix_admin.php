<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$admin = User::where('email', 'admin@gmail.com')->first();

if ($admin) {
    $admin->password = 'admin000'; // Will be hashed by the 'hashed' cast
    $admin->role = 'admin';
    $admin->save();
    echo "Admin user updated successfully.\n";
} else {
    User::create([
        'name' => 'Admin RH',
        'email' => 'admin@gmail.com',
        'password' => 'admin000',
        'role' => 'admin',
    ]);
    echo "Admin user created successfully.\n";
}
