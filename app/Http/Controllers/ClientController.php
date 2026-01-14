<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index(): Response
    {
        $clients = Auth::user()->clients()
            ->withCount('invoices')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new client.
     */
    public function create(): Response
    {
        return Inertia::render('Clients/Create');
    }

    /**
     * Store a newly created client.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_whatsapp' => 'required|string|max:20',
        ]);

        // Clean up WhatsApp number (remove spaces, dashes, etc.)
        $validated['client_whatsapp'] = preg_replace('/[^0-9]/', '', $validated['client_whatsapp']);

        // Convert 08xxx to 628xxx
        if (str_starts_with($validated['client_whatsapp'], '0')) {
            $validated['client_whatsapp'] = '62' . substr($validated['client_whatsapp'], 1);
        }

        Auth::user()->clients()->create($validated);

        return redirect()->route('clients.index')
            ->with('success', 'Client berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified client.
     */
    public function edit(Client $client): Response
    {
        // Ensure user owns this client
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Clients/Edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified client.
     */
    public function update(Request $request, Client $client): RedirectResponse
    {
        // Ensure user owns this client
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_whatsapp' => 'required|string|max:20',
        ]);

        // Clean up WhatsApp number
        $validated['client_whatsapp'] = preg_replace('/[^0-9]/', '', $validated['client_whatsapp']);

        if (str_starts_with($validated['client_whatsapp'], '0')) {
            $validated['client_whatsapp'] = '62' . substr($validated['client_whatsapp'], 1);
        }

        $client->update($validated);

        return redirect()->route('clients.index')
            ->with('success', 'Client berhasil diupdate.');
    }

    /**
     * Remove the specified client.
     */
    public function destroy(Client $client): RedirectResponse
    {
        // Ensure user owns this client
        if ($client->user_id !== Auth::id()) {
            abort(403);
        }

        $client->delete();

        return redirect()->route('clients.index')
            ->with('success', 'Client berhasil dihapus.');
    }
}
