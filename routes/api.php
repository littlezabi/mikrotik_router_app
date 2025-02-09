<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangePackageController;
use App\Http\Controllers\UserDisable;
use App\Http\Controllers\UserEnable;
use App\Http\Controllers\DisableDueUser;
use App\Http\Controllers\Log;
use App\Http\Controllers\OpenTicket;
use App\Http\Controllers\CloseTicket;
use App\Http\Controllers\AddComment;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserDownload;
use App\Http\Controllers\BillingDownload;
use App\Http\Controllers\PaymentDownload;
use App\Http\Controllers\ShowUser;
use App\Http\Controllers\InvoiceDownload;


Route::middleware('auth:sanctum')->group(function () {
    // dd("Hello", Auth::user());
    Route::apiResource('/packages', PackageController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/billing', BillingController::class);
    Route::apiResource('/payment', PaymentController::class)->only(['index', 'store']);
    Route::apiResource('/ticket', TicketController::class);

    Route::get('/payment/create/{param}', [PaymentController::class, 'create']);
    Route::post('/payment/process', [PaymentController::class, 'process']);

    Route::get('/isp', [CompanyController::class, 'edit']);
    Route::patch('/isp', [CompanyController::class, 'update']);

    Route::get('/settings', [SettingController::class, 'edit']);
    Route::patch('/settings', [SettingController::class, 'update']);

    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);

    Route::get('/change-package/{user}/edit', [ChangePackageController::class, 'edit']);
    Route::patch('/change-package/{user}', [ChangePackageController::class, 'update']);
    Route::patch('/user-disable/{user}', UserDisable::class);
    Route::patch('/user-enable/{user}', UserEnable::class);

    Route::post('/due-user-disable', DisableDueUser::class);
    Route::get('/log', Log::class);

    Route::post('/open-ticket/{ticket}', OpenTicket::class);
    Route::post('/close-ticket/{ticket}', CloseTicket::class);
    Route::post('/add-comment', AddComment::class);

    Route::get('/user-download', UserDownload::class);
    Route::get('/billing-download', BillingDownload::class);
    Route::get('/payment-download', PaymentDownload::class);
    Route::get('/single-download/{user}', ShowUser::class);
    Route::get('/invoice-download/{row}', InvoiceDownload::class);
});

require __DIR__ . '/auth.php';
