<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Temporary migration route
Route::get('/migrate-db-force', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate --force');
    return 'Migration completed: ' . \Illuminate\Support\Facades\Artisan::output();
});

// Landing page
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('Welcome');
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Clients
    Route::resource('clients', ClientController::class);

    // Invoices
    Route::resource('invoices', InvoiceController::class);
    Route::post('/invoices/{invoice}/send', [InvoiceController::class, 'send'])->name('invoices.send');
    Route::post('/invoices/{invoice}/mark-paid', [InvoiceController::class, 'markPaid'])->name('invoices.mark-paid');
    Route::post('/invoices/{invoice}/wa-link', [InvoiceController::class, 'generateWaLink'])->name('invoices.wa-link');

    // Upgrade page
    Route::get('/upgrade', function () {
        return Inertia::render('Upgrade', [
            'user' => [
                'plan' => auth()->user()->plan,
                'invoice_count' => auth()->user()->invoice_count,
            ],
        ]);
    })->name('upgrade');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::post('/users/{user}/upgrade', [AdminController::class, 'upgradeToPaid'])->name('users.upgrade');
    Route::post('/users/{user}/downgrade', [AdminController::class, 'downgradeToFree'])->name('users.downgrade');
    Route::post('/users/{user}/reset-count', [AdminController::class, 'resetInvoiceCount'])->name('users.reset-count');
});

require __DIR__ . '/auth.php';

