<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::apiResource('books', BookController::class);

// Route::apiResource('auth', AuthController::class);
// Route::post('auth/register', [AuthController::class, 'register']);
// Route::post('auth/login', [AuthController::class, 'login']);
// Route::post('auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
