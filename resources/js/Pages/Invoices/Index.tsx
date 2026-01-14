import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Invoice, UserPlanInfo } from '@/types';

interface Props extends PageProps {
    invoices: Invoice[];
    filters: {
        status: string;
    };
    user: UserPlanInfo;
}

export default function InvoicesIndex({ invoices, filters, user }: Props) {
    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return 'Rp' + num.toLocaleString('id-ID');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
        });
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            draft: 'bg-gray-100 text-gray-700',
            sent: 'bg-blue-100 text-blue-700',
            paid: 'bg-green-100 text-green-700',
        };
        const labels = {
            draft: 'Draft',
            sent: 'Terkirim',
            paid: 'Lunas',
        };
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const handleStatusFilter = (status: string) => {
        router.get(route('invoices.index'), { status }, { preserveState: true });
    };

    const statusTabs = [
        { key: 'all', label: 'Semua' },
        { key: 'draft', label: 'Draft' },
        { key: 'sent', label: 'Terkirim' },
        { key: 'paid', label: 'Lunas' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Invoices" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Invoices</h1>
                        <Link
                            href={route('invoices.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition shadow-lg shadow-green-600/20"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">Buat Invoice</span>
                            <span className="sm:hidden">Buat</span>
                        </Link>
                    </div>

                    {/* Status Tabs - Horizontally scrollable on mobile */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleStatusFilter(tab.key)}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
                                    filters.status === tab.key
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Plan warning */}
                    {user.plan === 'free' && !user.can_send_invoice && (
                        <div className="mb-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-medium">Batas invoice gratis tercapai</p>
                                    <p className="text-sm text-white/80">Upgrade ke Pro untuk unlimited</p>
                                </div>
                                <Link
                                    href={route('upgrade')}
                                    className="flex-shrink-0 bg-white text-amber-600 px-4 py-2 rounded-lg text-sm font-semibold"
                                >
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Invoice List - Card style for mobile */}
                    {invoices.length > 0 ? (
                        <div className="space-y-2">
                            {invoices.map((invoice) => (
                                <Link
                                    key={invoice.id}
                                    href={route('invoices.show', invoice.id)}
                                    className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-green-200 transition"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {invoice.client?.client_name}
                                                </p>
                                                {getStatusBadge(invoice.status)}
                                            </div>
                                            <p className="text-sm text-gray-500 truncate mt-0.5">
                                                {invoice.description}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{formatDate(invoice.created_at)}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl sm:text-3xl">📋</span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {filters.status === 'all' ? 'Belum ada invoice' : `Tidak ada invoice ${filters.status}`}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {filters.status === 'all'
                                    ? 'Mulai dengan membuat invoice pertama'
                                    : 'Coba filter status lain'}
                            </p>
                            {filters.status === 'all' && (
                                <Link
                                    href={route('invoices.create')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Buat Invoice Pertama
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
