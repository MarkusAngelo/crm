<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/add-customer', [UserController::class, 'addCustomer']);
Route::get('/list-customers', [UserController::class, 'listCustomers']);
Route::get('/view-customer/{id}', [UserController::class, 'viewCustomer']);
Route::post('/remove-customer', [UserController::class, 'removeCustomer']);

Route::post('/update-customer', [UserController::class, 'updateCustomer']);