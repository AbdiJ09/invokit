import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Client } from '@/types';
import { FormEventHandler } from 'react';

interface Props extends PageProps {
    clients: Client[];
}

export default function InvoicesCreate({ clients }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedClientId = urlParams.get('client_id');

    const { data, setData, post, processing, errors } = useForm({
        client_id: preselectedClientId || '',
        amount: '',
        description: '',
        due_date: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <AuthenticatedLayout>
            <Head title="Buat Invoice" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <Link
                            href={route('invoices.index')}
                            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Buat Invoice</h1>
                    </div>

                    {clients.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👤</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Belum ada client</h3>
                            <p className="text-sm text-gray-500 mb-6">Tambahkan client dulu sebelum buat invoice</p>
                            <Link
                                href={route('clients.create')}
                                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition"
                            >
                                Tambah Client
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Client
                                    </label>
                                    <select
                                        id="client_id"
                                        value={data.client_id}
                                        onChange={(e) => setData('client_id', e.target.value)}
                                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                                        required
                                    >
                                        <option value="">Pilih client...</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.client_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.client_id && (
                                        <p className="mt-1.5 text-sm text-red-600">{errors.client_id}</p>
                                    )}
                                    <Link
                                        href={route('clients.create')}
                                        className="inline-flex items-center mt-2 text-xs text-green-600 hover:text-green-700"
                                    >
                                        + Tambah client baru
                                    </Link>
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Nominal (Rp)
                                    </label>
                                    <input
                                        id="amount"
                                        type="number"
                                        min="1000"
                                        step="1000"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                                        placeholder="5000000"
                                        required
                                    />
                                    {errors.amount && (
                                        <p className="mt-1.5 text-sm text-red-600">{errors.amount}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Deskripsi Pekerjaan
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        placeholder="Pembuatan website company profile"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Jatuh Tempo <span className="text-gray-400">(opsional)</span>
                                    </label>
                                    <input
                                        id="due_date"
                                        type="date"
                                        min={today}
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                                    />
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Untuk memilih template yang tepat
                                    </p>
                                    {errors.due_date && (
                                        <p className="mt-1.5 text-sm text-red-600">{errors.due_date}</p>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-4 border-t">
                                    <Link
                                        href={route('invoices.index')}
                                        className="flex-1 rounded-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 rounded-xl bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Draft'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
