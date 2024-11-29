<?php

use App\Http\Controllers\DesenvolvedorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Criar devs
Route::post('/cadastro', [DesenvolvedorController::class, 'store']);

//Listar devs
Route::get('/listar', [DesenvolvedorController::class, 'listDevs']);

//Mesma rota, só muda a request:
//Atualizar dev
Route::put('/editdev/{id}', [DesenvolvedorController::class, 'updateDevs']);
Route::patch('/editdev/{id}', [DesenvolvedorController::class, 'updateDevs']);

//Excluir Dev
Route::delete('/editdev/{id}', [DesenvolvedorController::class, 'excludeDevs']);