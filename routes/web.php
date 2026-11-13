<?php

use App\Http\Controllers\ArtistController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/artist');
Route::redirect('/react', '/artist');

Route::get('/artist', [ArtistController::class, 'index'])
    ->name('artist.index');

    Route::get('/artist/{id}', [ArtistController::class, 'show'])
    ->name('artist.show');