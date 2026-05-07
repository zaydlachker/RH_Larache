<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArreteController;

Route::get('/', function () {
    return view('home');
});

Route::post('/generate/{type}', [ArreteController::class, 'generate']);
Route::get('/arretes', [ArreteController::class, 'index']);
Route::get('/fonctionnaires', function() {
    return \App\Models\Fonctionnaire::with('user')->get();
});
Route::get('/arrete/download/{id}', [ArreteController::class, 'download']);