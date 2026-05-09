<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/fonctionnaires', function() {
    return \App\Models\Fonctionnaire::with('user')->get();
});