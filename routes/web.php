<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/books', function () {
    return Inertia::render('Books/List');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/books/add', function () {
    return Inertia::render('Books/Add');
})->middleware(['auth', 'verified'])->name('add');

Route::get('/books/edit/{id}', function ($id) {
    return Inertia::render('Books/Edit', ['id' => $id]);
})->middleware(['auth', 'verified'])->name('edit');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
