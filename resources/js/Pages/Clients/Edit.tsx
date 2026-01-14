import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Client } from '@/types';
import { FormEventHandler } from 'react';

interface Props extends PageProps {
    client: Client;
}

export default function ClientsEdit({ client }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        client_name: client.client_name,
        client_whatsapp: client.client_whatsapp,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('clients.update', client.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Client" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <Link
                            href={route('clients.index')}
                            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Edit Client</h1>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nama Client
                                </label>
                                <input
                                    id="client_name"
                                    type="text"
                                    value={data.client_name}
                                    onChange={(e) => setData('client_name', e.target.value)}
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                                    required
                                />
                                {errors.client_name && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.client_name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="client_whatsapp" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nomor WhatsApp
                                </label>
                                <input
                                    id="client_whatsapp"
                                    type="tel"
                                    value={data.client_whatsapp}
                                    onChange={(e) => setData('client_whatsapp', e.target.value)}
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                                    required
                                />
                                <p className="mt-1.5 text-xs text-gray-400">
                                    Format: 08xxx atau 628xxx
                                </p>
                                {errors.client_whatsapp && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.client_whatsapp}</p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Link
                                    href={route('clients.index')}
                                    className="flex-1 rounded-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
