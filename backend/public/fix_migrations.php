<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

header('Content-Type: application/json');

$toAdd = [
    '2026_05_07_000000_upgrade_acte_administratifs_table',
    '2026_05_07_000001_upgrade_fonctionnaires_table_v2',
    '2026_05_07_999999_fix_admin_account'
];

$results = [];
$batch = DB::table('migrations')->max('batch') ?: 0;
$batch++;

foreach ($toAdd as $m) {
    try {
        $exists = DB::table('migrations')->where('migration', $m)->exists();
        if (!$exists) {
            DB::table('migrations')->insert([
                'migration' => $m,
                'batch' => $batch
            ]);
            $results[] = "Added: $m";
        } else {
            $results[] = "Skipped (exists): $m";
        }
    } catch (\Exception $e) {
        $results[] = "Error $m: " . $e->getMessage();
    }
}

echo json_encode($results, JSON_PRETTY_PRINT);
