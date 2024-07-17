<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/add-customer', [UserController::class, 'addCustomer']);
Route::get('/list-customers', [UserController::class, 'listCustomers']);
Route::get('/view-customer/{id}', [UserController::class, 'viewCustomer']);
Route::post('/remove-customer', [UserController::class, 'removeCustomer']);

Route::post('/update-customer', [UserController::class, 'updateCustomer']);
