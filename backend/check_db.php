<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Fonctionnaire;

$count = Fonctionnaire::count();
$first = Fonctionnaire::first();

echo "Total Fonctionnaires: $count\n";
if ($first) {
    echo "First ID: " . $first->id . "\n";
} else {
    echo "No fonctionnaires found!\n";
}
