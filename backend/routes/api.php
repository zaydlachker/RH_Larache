<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConcoursController;
use App\Http\Controllers\CandidatureController;
use App\Http\Controllers\FonctionnaireController;
use App\Http\Controllers\NotationController;
use App\Http\Controllers\ActeAdministratifController;
use App\Http\Controllers\DashboardController;

// Auth Routes
Route::prefix('v1')->group(function () {
    // Authentication
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

    // Concours Routes
    Route::get('concours', [ConcoursController::class, 'index'])->middleware('auth:sanctum');
    Route::get('concours/{concours}', [ConcoursController::class, 'show'])->middleware('auth:sanctum');
    Route::post('concours', [ConcoursController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);
    Route::put('concours/{concours}', [ConcoursController::class, 'update'])->middleware(['auth:sanctum', 'role:admin']);
    Route::delete('concours/{concours}', [ConcoursController::class, 'destroy'])->middleware(['auth:sanctum', 'role:admin']);

    // Candidature Routes
    Route::get('candidatures', [CandidatureController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
    Route::post('candidatures', [CandidatureController::class, 'store'])->middleware(['auth:sanctum']); // All auth users can apply
    Route::get('candidatures/{candidature}', [CandidatureController::class, 'show'])->middleware('auth:sanctum');
    Route::put('candidatures/{candidature}', [CandidatureController::class, 'update'])->middleware(['auth:sanctum', 'role:admin']);
    Route::delete('candidatures/{candidature}', [CandidatureController::class, 'destroy'])->middleware(['auth:sanctum', 'role:admin']);
    
    Route::get('candidats/{candidat}/candidatures', [CandidatureController::class, 'byCandidat'])->middleware('auth:sanctum');

    // Fonctionnaire Routes
    Route::get('fonctionnaire/profile', [FonctionnaireController::class, 'myProfile'])->middleware(['auth:sanctum', 'role:fonctionnaire']);
    Route::apiResource('fonctionnaires', FonctionnaireController::class)
        ->middleware(['auth:sanctum', 'role:admin'])
        ->parameters(['fonctionnaires' => 'fonctionnaire']);

    // Acte Administratif Routes (with PDF generation)
    Route::apiResource('actes-administratifs', ActeAdministratifController::class)
        ->middleware(['auth:sanctum', 'role:admin'])
        ->parameters(['actes-administratifs' => 'acte_administratif']);
    Route::get('actes-administratifs/{acte_administratif}/download', [ActeAdministratifController::class, 'download'])->middleware('auth:sanctum');
    Route::post('candidats/{candidat}/generate-certificat', [ActeAdministratifController::class, 'generateCertificat'])->middleware(['auth:sanctum', 'role:admin']);

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);

    // Arrêtés Generation (No CSRF required)
    Route::post('generate/{type}', [\App\Http\Controllers\ArreteController::class, 'generate']);
    Route::get('generate/{type}/test', [\App\Http\Controllers\ArreteController::class, 'test']); // Debug Route
    Route::get('arretes', [\App\Http\Controllers\ArreteController::class, 'index']);
    Route::get('arrete/download/{id}', [\App\Http\Controllers\ArreteController::class, 'download']);

    // Notifications
    Route::get('notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->middleware('auth:sanctum');
    Route::patch('notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->middleware('auth:sanctum');
    Route::delete('notifications', [\App\Http\Controllers\NotificationController::class, 'clearAll'])->middleware('auth:sanctum');
    
    Route::get('run-migrations', function() {
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            return "Migrations success: " . \Illuminate\Support\Facades\Artisan::output();
        } catch (\Exception $e) {
            return "Migrations failed: " . $e->getMessage();
        }
    });
});
