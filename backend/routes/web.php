<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArreteController;

Route::get('/', function () {
    return view('home');
});

Route::post('/generate/{type}', [ArreteController::class, 'generate']);