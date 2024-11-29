<?php

use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\LevelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Rotas dos desenvolvedores
//Criar devs
Route::post('/desenvolvedores', [DeveloperController::class, 'store']);

//Listar devs
Route::get('/desenvolvedores', [DeveloperController::class, 'listDevs']);

//Atualizar dev
Route::put('/desenvolvedores/{id}', [DeveloperController::class, 'updateDevs']);

//Excluir Dev
Route::delete('/desenvolvedores/{id}', [DeveloperController::class, 'excludeDevs']);

//Rotas dos níveis
//Criar nivel
Route::post('/niveis', [LevelController::class, 'store']);

//Listar níveis
Route::get('/niveis', [LevelController::class, 'listLevels']);

//Atualizar níveis
Route::put('/niveis/{id}', [LevelController::class, 'updateLevels']);

//Excluir n;iveis
Route::delete('/niveis/{id}', [LevelController::class, 'excludeLevels']);