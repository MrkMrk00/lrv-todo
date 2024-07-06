<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/logout', function () {
    Auth::logout();

    return true;
})->name('logout');

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Home');
    });
});

