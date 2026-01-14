<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Check if user is admin.
     */
    public function __construct()
    {
        // Middleware will handle this
    }

    /**
     * Display admin dashboard.
     */
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'free_users' => User::where('plan', 'free')->count(),
            'paid_users' => User::where('plan', 'paid')->count(),
        ];

        $recentUsers = User::orderBy('created_at', 'desc')
            ->limit(10)
            ->get(['id', 'name', 'email', 'plan', 'invoice_count', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
        ]);
    }

    /**
     * Display all users.
     */
    public function users(Request $request): Response
    {
        $query = User::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%");
            });
        }

        // Filter by plan
        if ($request->has('plan') && $request->plan !== 'all') {
            $query->where('plan', $request->plan);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'filters' => [
                'search' => $request->search ?? '',
                'plan' => $request->plan ?? 'all',
            ],
        ]);
    }

    /**
     * Upgrade user to paid plan.
     */
    public function upgradeToPaid(User $user): RedirectResponse
    {
        $user->update(['plan' => 'paid']);

        return redirect()->back()
            ->with('success', "User {$user->name} berhasil diupgrade ke paket berbayar.");
    }

    /**
     * Downgrade user to free plan.
     */
    public function downgradeToFree(User $user): RedirectResponse
    {
        $user->update(['plan' => 'free']);

        return redirect()->back()
            ->with('success', "User {$user->name} berhasil didowngrade ke paket gratis.");
    }

    /**
     * Reset user's invoice count.
     */
    public function resetInvoiceCount(User $user): RedirectResponse
    {
        $user->update(['invoice_count' => 0]);

        return redirect()->back()
            ->with('success', "Invoice count untuk {$user->name} berhasil direset.");
    }
}
