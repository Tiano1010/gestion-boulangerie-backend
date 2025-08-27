<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PromotionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes publiques et protégées de l'application.
| Les routes protégées nécessitent un token Sanctum.
|
*/

// =======================
// Routes publiques
// =======================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// =======================
// Routes protégées (auth:sanctum)
// =======================
Route::middleware('auth:sanctum')->group(function () {

    // Infos de l'utilisateur connecté
    Route::get('/me', [AuthController::class, 'me']);

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route test protégée
    Route::get('/ping', fn() => response()->json(['pong' => true]));

    // Récupérer l'utilisateur courant
    Route::get('/user', fn(Request $request) => $request->user());

    // =======================
    // CRUD Categories
    // =======================
    Route::apiResource('categories', CategoryController::class);

    // =======================
    // CRUD Products
    // =======================
    Route::apiResource('products', ProductController::class);

    // =======================
    // CRUD Addresses
    // =======================
    Route::apiResource('addresses', AddressController::class);

    // =======================
    // CRUD Promotions
    // =======================
    Route::apiResource('promotions', PromotionController::class);

    // =======================
    // Commandes (Orders)
    // =======================
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    // Client peut annuler sa propre commande (ou ADMIN)
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);

    // ADMIN : changer le statut d'une commande
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])
        ->middleware('role:ADMIN');

    // Récupérer les statuts possibles d'une commande
    Route::get('/orders/statuses', [OrderController::class, 'statuses']);
    // Gestion utilisateur (Users)
    Route::middleware(['auth:sanctum', 'role:ADMIN'])->group(function () {
        Route::apiResource('users', UserController::class);
    });

    Route::middleware(['auth:sanctum', 'role:CLIENT'])->group(function () {
        Route::get('/client/orders', [ClientController::class, 'orders']);
        Route::post('/client/orders', [ClientController::class, 'createOrder']);
        Route::post('/client/orders/{order}/cancel', [ClientController::class, 'cancelOrder']);
    });

});
