import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Client } from '@/types';
import { useConfirm } from '@/Components/ConfirmModal';

interface Props extends PageProps {
    clients: (Client & { invoices_count: number })[];
}

export default function ClientsIndex({ clients }: Props) {
    const confirm = useConfirm();

    const handleDelete = (client: Client) => {
        confirm({
            title: 'Hapus Client?',
            message: `Yakin hapus "${client.client_name}"? Semua invoice terkait juga akan dihapus.`,
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            variant: 'danger',
            onConfirm: () => {
                router.delete(route('clients.destroy', client.id));
            },
        });
    };

    const formatPhone = (phone: string) => {
        if (phone.startsWith('62')) {
            return '+62 ' + phone.slice(2);
        }
        return phone;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Clients" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Clients</h1>
                        <Link
                            href={route('clients.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition shadow-lg shadow-green-600/20"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">Tambah Client</span>
                            <span className="sm:hidden">Tambah</span>
                        </Link>
                    </div>

                    {/* Client List */}
                    {clients.length > 0 ? (
                        <div className="space-y-2">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-700 font-semibold text-lg">
                                                {client.client_name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-900 truncate">
                                                {client.client_name}
                                            </p>
                                            <a
                                                href={`https://wa.me/${client.client_whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm text-gray-500 hover:text-green-600"
                                            >
                                                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                </svg>
                                                {formatPhone(client.client_whatsapp)}
                                            </a>
                                        </div>

                                        {/* Stats & Actions */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400 hidden sm:block">
                                                {client.invoices_count} invoice
                                            </span>

                                            <div className="flex gap-1">
                                                <Link
                                                    href={route('invoices.create', { client_id: client.id })}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                    title="Buat Invoice"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route('clients.edit', client.id)}
                                                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(client)}
                                                    className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl sm:text-3xl">👥</span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada client</h3>
                            <p className="text-gray-500 mb-6">Mulai dengan menambahkan client pertama</p>
                            <Link
                                href={route('clients.create')}
                                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Client Pertama
                            </Link>
                        </div>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
