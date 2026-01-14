import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { useState } from 'react';
import { useConfirm } from '@/Components/ConfirmModal';

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends PageProps {
    users: PaginatedUsers;
    filters: {
        search: string;
        plan: string;
    };
}

export default function AdminUsers({ users, filters }: Props) {
    const confirm = useConfirm();
    const [search, setSearch] = useState(filters.search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.users'), { search, plan: filters.plan }, { preserveState: true });
    };

    const handlePlanFilter = (plan: string) => {
        router.get(route('admin.users'), { search: filters.search, plan }, { preserveState: true });
    };

    const handleUpgrade = (user: User) => {
        confirm({
            title: 'Upgrade ke Pro?',
            message: `Upgrade ${user.name} ke paket Pro?`,
            confirmText: 'Ya, Upgrade',
            cancelText: 'Batal',
            variant: 'default',
            onConfirm: () => {
                router.post(route('admin.users.upgrade', user.id));
            },
        });
    };

    const handleDowngrade = (user: User) => {
        confirm({
            title: 'Downgrade ke Free?',
            message: `Downgrade ${user.name} ke paket Free?`,
            confirmText: 'Ya, Downgrade',
            cancelText: 'Batal',
            variant: 'warning',
            onConfirm: () => {
                router.post(route('admin.users.downgrade', user.id));
            },
        });
    };

    const handleResetCount = (user: User) => {
        confirm({
            title: 'Reset Invoice Count?',
            message: `Reset jumlah invoice terkirim untuk ${user.name} ke 0?`,
            confirmText: 'Ya, Reset',
            cancelText: 'Batal',
            variant: 'warning',
            onConfirm: () => {
                router.post(route('admin.users.reset-count', user.id));
            },
        });
    };

    const planTabs = [
        { key: 'all', label: 'Semua' },
        { key: 'free', label: 'Free' },
        { key: 'paid', label: 'Pro' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Users" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <Link
                            href={route('admin.dashboard')}
                            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Users</h1>
                        <span className="text-sm text-gray-400">({users.total})</span>
                    </div>

                    {/* Search & Filters */}
                    <div className="space-y-3 mb-4">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama atau email..."
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 pl-10 py-3"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </form>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {planTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => handlePlanFilter(tab.key)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
                                        filters.plan === tab.key
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="space-y-2">
                        {users.data.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-600 font-medium">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                                {user.is_admin && (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{user.invoice_count} inv</span>
                                            {user.plan === 'paid' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    Pro
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                    Free
                                                </span>
                                            )}
                                        </div>
                                        {!user.is_admin && (
                                            <div className="flex gap-2">
                                                {user.plan === 'free' ? (
                                                    <button
                                                        onClick={() => handleUpgrade(user)}
                                                        className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
                                                    >
                                                        Upgrade
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDowngrade(user)}
                                                        className="px-3 py-1 text-xs font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition"
                                                    >
                                                        Downgrade
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleResetCount(user)}
                                                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {users.data.length} dari {users.total}
                            </p>
                            <div className="flex gap-1">
                                {users.links.slice(1, -1).map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                                            link.active
                                                ? 'bg-green-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-50 text-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
