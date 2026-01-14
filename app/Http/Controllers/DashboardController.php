<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Get stats
        $stats = [
            'total_clients' => $user->clients()->count(),
            'total_invoices' => $user->invoices()->count(),
            'draft_invoices' => $user->invoices()->where('status', 'draft')->count(),
            'sent_invoices' => $user->invoices()->where('status', 'sent')->count(),
            'paid_invoices' => $user->invoices()->where('status', 'paid')->count(),
            'total_amount' => $user->invoices()->where('status', 'paid')->sum('amount'),
            'pending_amount' => $user->invoices()->where('status', 'sent')->sum('amount'),
        ];

        // Get recent invoices
        $recentInvoices = $user->invoices()
            ->with('client')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get overdue invoices (sent + past due date)
        $overdueInvoices = $user->invoices()
            ->with('client')
            ->where('status', 'sent')
            ->whereNotNull('due_date')
            ->where('due_date', '<', now())
            ->orderBy('due_date', 'asc')
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentInvoices' => $recentInvoices,
            'overdueInvoices' => $overdueInvoices,
            'user' => [
                'name' => $user->name,
                'plan' => $user->plan,
                'invoice_count' => $user->invoice_count,
                'can_send_invoice' => $user->canSendInvoice(),
                'invoices_remaining' => $user->plan === 'free' ? max(0, 3 - $user->invoice_count) : null,
            ],
        ]);
    }
}
