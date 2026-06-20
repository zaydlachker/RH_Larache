<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/fonctionnaires', function() {
    return \App\Models\Fonctionnaire::with('user')->get();
});

Route::get('/install-browsershot', function () {
    $path = base_path();
    $output = [];
    
    $output[] = "Installing spatie/browsershot...";
    $output[] = shell_exec("cd {$path} && composer require spatie/browsershot 2>&1");
    
    $output[] = "\nVerifying Class Exists: " . (class_exists('Spatie\Browsershot\Browsershot') ? 'YES' : 'NO - TRY RESTARTING PHP ARTISAN SERVE');
    
    $output[] = "\nChecking Node.js...";
    $output[] = shell_exec("node -v 2>&1");
    
    $output[] = "\nChecking NPM...";
    $output[] = shell_exec("npm -v 2>&1");
    
    $output[] = "\nNode modules puppeteer check...";
    $output[] = file_exists($path . '/node_modules/puppeteer') ? 'Puppeteer is present' : 'Puppeteer is missing';

    return response("<pre>" . implode("\n", $output) . "</pre>");
});

Route::get('/test-pdf', function () {
    try {
        $html = "<h1>Test Arabic: مرحبا العالم</h1>";
        $pdf = \Spatie\Browsershot\Browsershot::html($html)
            ->format('A4')
            ->showBackground()
            ->pdf();
            
        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
        ]);
    } catch (\Exception $e) {
        return response($e->getMessage(), 500);
    }
});