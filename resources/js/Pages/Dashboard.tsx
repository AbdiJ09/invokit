import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Invoice, UserPlanInfo } from '@/types';

interface Stats {
    total_clients: number;
    total_invoices: number;
    draft_invoices: number;
    sent_invoices: number;
    paid_invoices: number;
    total_amount: string;
    pending_amount: string;
}

interface DashboardUser extends UserPlanInfo {
    name: string;
}

interface Props extends PageProps {
    stats: Stats;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
    user: DashboardUser;
}

export default function Dashboard({ stats, recentInvoices, overdueInvoices, user }: Props) {
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

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Mobile Header */}
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Halo, {user.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {user.plan === 'free'
                                ? `${user.invoices_remaining} invoice tersisa`
                                : 'Paket Pro aktif'}
                        </p>
                    </div>

                    {/* Quick Action - Mobile First */}
                    <div className="mb-6">
                        <Link
                            href={route('invoices.create')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-base font-medium text-white hover:bg-green-700 transition shadow-lg shadow-green-600/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Buat Invoice Baru
                        </Link>
                    </div>

                    {/* Plan Warning - Mobile Optimized */}
                    {user.plan === 'free' && user.invoices_remaining !== undefined && user.invoices_remaining !== null && user.invoices_remaining <= 1 && (
                        <div className="mb-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-lg">⚡</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {user.invoices_remaining === 0 ? 'Batas tercapai!' : 'Sisa 1 invoice'}
                                        </p>
                                        <p className="text-sm text-white/80">Upgrade ke Pro</p>
                                    </div>
                                </div>
                                <Link
                                    href={route('upgrade')}
                                    className="flex-shrink-0 bg-white text-amber-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-50 transition"
                                >
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Stats Cards - 2 column on mobile */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Dibayar</p>
                                    <p className="text-lg sm:text-xl font-bold text-green-600 mt-0.5">
                                        {formatCurrency(stats.total_amount)}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg">💰</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Pending</p>
                                    <p className="text-lg sm:text-xl font-bold text-amber-600 mt-0.5">
                                        {formatCurrency(stats.pending_amount)}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg">⏳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats - Horizontal scroll on mobile */}
                    <div className="flex gap-3 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                        <Link
                            href={route('clients.index')}
                            className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-[120px] hover:border-green-200 transition"
                        >
                            <p className="text-2xl font-bold text-gray-900">{stats.total_clients}</p>
                            <p className="text-xs text-gray-500 mt-1">Clients</p>
                        </Link>
                        <Link
                            href={route('invoices.index', { status: 'draft' })}
                            className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-[120px] hover:border-green-200 transition"
                        >
                            <p className="text-2xl font-bold text-gray-700">{stats.draft_invoices}</p>
                            <p className="text-xs text-gray-500 mt-1">Draft</p>
                        </Link>
                        <Link
                            href={route('invoices.index', { status: 'sent' })}
                            className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-[120px] hover:border-green-200 transition"
                        >
                            <p className="text-2xl font-bold text-blue-600">{stats.sent_invoices}</p>
                            <p className="text-xs text-gray-500 mt-1">Terkirim</p>
                        </Link>
                        <Link
                            href={route('invoices.index', { status: 'paid' })}
                            className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-[120px] hover:border-green-200 transition"
                        >
                            <p className="text-2xl font-bold text-green-600">{stats.paid_invoices}</p>
                            <p className="text-xs text-gray-500 mt-1">Lunas</p>
                        </Link>
                    </div>

                    {/* Overdue Invoices - Mobile Card Style */}
                    {overdueInvoices.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-xs">🔔</span>
                                </div>
                                <h2 className="font-semibold text-gray-900">Overdue ({overdueInvoices.length})</h2>
                            </div>
                            <div className="space-y-2">
                                {overdueInvoices.slice(0, 3).map((invoice) => (
                                    <Link
                                        key={invoice.id}
                                        href={route('invoices.show', invoice.id)}
                                        className="block bg-red-50 rounded-xl p-4 border border-red-100 hover:bg-red-100 transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900 truncate">{invoice.client?.client_name}</p>
                                                <p className="text-xs text-red-600 mt-0.5">
                                                    Jatuh tempo: {formatDate(invoice.due_date!)}
                                                </p>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <p className="font-semibold text-red-600">{formatCurrency(invoice.amount)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Invoices - Mobile List */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-gray-900">Invoice Terbaru</h2>
                            <Link href={route('invoices.index')} className="text-sm text-green-600 font-medium">
                                Lihat semua
                            </Link>
                        </div>

                        {recentInvoices.length > 0 ? (
                            <div className="space-y-2">
                                {recentInvoices.map((invoice) => (
                                    <Link
                                        key={invoice.id}
                                        href={route('invoices.show', invoice.id)}
                                        className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-green-200 transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-gray-900 truncate">{invoice.client?.client_name}</p>
                                                    {getStatusBadge(invoice.status)}
                                                </div>
                                                <p className="text-sm text-gray-500 truncate mt-0.5">{invoice.description}</p>
                                            </div>
                                            <div className="ml-4 text-right flex-shrink-0">
                                                <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{formatDate(invoice.created_at)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <p className="text-gray-500 mb-4">Belum ada invoice</p>
                                <Link
                                    href={route('invoices.create')}
                                    className="inline-flex items-center text-green-600 font-medium"
                                >
                                    Buat invoice pertama →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Bottom spacing for mobile nav */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
