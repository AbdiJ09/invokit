<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * Default WA templates.
     */
    public const TEMPLATES = [
        'h-1' => "Halo Pak/Bu [Nama],\nmengingatkan invoice sebesar [Nominal] untuk pekerjaan [Deskripsi] yang jatuh tempo besok.\nMohon konfirmasinya ya. Terima kasih.",
        'h+1' => "Halo Pak/Bu [Nama],\nkami follow up invoice [Nominal] yang jatuh tempo kemarin.\nMohon konfirmasi status pembayarannya ya. Terima kasih.",
        'h+7' => "Halo Pak/Bu [Nama],\nkami mengingatkan kembali terkait invoice [Nominal] untuk pekerjaan [Deskripsi] yang hingga hari ini belum kami terima.\nMohon konfirmasi atau informasikan jika ada kendala. Terima kasih.",
    ];

    /**
     * Display a listing of invoices.
     */
    public function index(Request $request): Response
    {
        $query = Auth::user()->invoices()->with('client');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $invoices = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
            'filters' => [
                'status' => $request->status ?? 'all',
            ],
            'user' => [
                'plan' => Auth::user()->plan,
                'invoice_count' => Auth::user()->invoice_count,
                'can_send_invoice' => Auth::user()->canSendInvoice(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new invoice.
     */
    public function create(): Response
    {
        $clients = Auth::user()->clients()->orderBy('client_name')->get();

        return Inertia::render('Invoices/Create', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created invoice.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric|min:1000',
            'description' => 'required|string|max:500',
            'due_date' => 'nullable|date',
        ]);

        // Verify client belongs to user
        $client = Client::find($validated['client_id']);
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'draft';

        Invoice::create($validated);

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice berhasil dibuat.');
    }

    /**
     * Display the specified invoice.
     */
    public function show(Invoice $invoice): Response
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $invoice->load('client');

        // Determine suggested template based on due date
        $suggestedTemplate = 'h+1'; // default
        $daysUntilDue = $invoice->getDaysUntilDue();

        if ($daysUntilDue !== null) {
            if ($daysUntilDue === 1) {
                $suggestedTemplate = 'h-1';
            } elseif ($daysUntilDue <= -7) {
                $suggestedTemplate = 'h+7';
            } elseif ($daysUntilDue < 0) {
                $suggestedTemplate = 'h+1';
            }
        }

        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice,
            'templates' => self::TEMPLATES,
            'suggestedTemplate' => $suggestedTemplate,
            'user' => [
                'plan' => Auth::user()->plan,
                'invoice_count' => Auth::user()->invoice_count,
                'can_send_invoice' => Auth::user()->canSendInvoice(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified invoice.
     */
    public function edit(Invoice $invoice): Response
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $clients = Auth::user()->clients()->orderBy('client_name')->get();

        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice,
            'clients' => $clients,
        ]);
    }

    /**
     * Update the specified invoice.
     */
    public function update(Request $request, Invoice $invoice): RedirectResponse
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric|min:1000',
            'description' => 'required|string|max:500',
            'due_date' => 'nullable|date',
        ]);

        // Verify client belongs to user
        $client = Client::find($validated['client_id']);
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $invoice->update($validated);

        return redirect()->route('invoices.show', $invoice)
            ->with('success', 'Invoice berhasil diupdate.');
    }

    /**
     * Send invoice via WhatsApp - mark as sent.
     */
    public function send(Invoice $invoice): RedirectResponse
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $user = Auth::user();

        // Check if user can send (free plan limit check)
        if (!$user->canSendInvoice()) {
            return redirect()->route('invoices.show', $invoice)
                ->with('error', 'Batas invoice gratis tercapai. Silakan upgrade ke paket berbayar.');
        }

        // Update invoice status to sent
        if ($invoice->status === 'draft') {
            $invoice->update([
                'status' => 'sent',
                'sent_at' => now(),
            ]);

            // Increment user's invoice count
            $user->increment('invoice_count');
        }

        return redirect()->route('invoices.show', $invoice)
            ->with('success', 'Invoice ditandai sebagai terkirim.');
    }

    /**
     * Mark invoice as paid.
     */
    public function markPaid(Invoice $invoice): RedirectResponse
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $invoice->update(['status' => 'paid']);

        return redirect()->route('invoices.show', $invoice)
            ->with('success', 'Invoice ditandai sebagai lunas.');
    }

    /**
     * Remove the specified invoice.
     */
    public function destroy(Invoice $invoice): RedirectResponse
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $invoice->delete();

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice berhasil dihapus.');
    }

    /**
     * Generate WhatsApp link with message.
     */
    public function generateWaLink(Request $request, Invoice $invoice): \Illuminate\Http\JsonResponse
    {
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $invoice->load('client');

        // Replace placeholders
        $message = str_replace(
            ['[Nama]', '[Nominal]', '[Deskripsi]'],
            [$invoice->client->client_name, $invoice->formatted_amount, $invoice->description],
            $validated['message']
        );

        $phone = $invoice->client->client_whatsapp;
        $encodedMessage = urlencode($message);

        $waLink = "https://wa.me/{$phone}?text={$encodedMessage}";

        return response()->json([
            'link' => $waLink,
            'message' => $message,
        ]);
    }
}
