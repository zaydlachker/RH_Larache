<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

header('Content-Type: application/json');

try {
    $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table'");
    
    $migrations = DB::table('migrations')->get();
    
    $fonctionnairesColumns = DB::select("PRAGMA table_info(fonctionnaires)");
    $actesColumns = DB::select("PRAGMA table_info(acte_administratifs)");
    
    echo json_encode([
        'tables' => array_column($tables, 'name'),
        'applied_migrations' => $migrations->pluck('migration'),
        'fonctionnaires_columns' => array_column($fonctionnairesColumns, 'name'),
        'acte_administratifs_columns' => array_column($actesColumns, 'name'),
    ], JSON_PRETTY_PRINT);
} catch (\Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
