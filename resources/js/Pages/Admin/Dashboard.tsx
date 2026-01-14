import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';

interface Stats {
    total_users: number;
    free_users: number;
    paid_users: number;
}

interface Props extends PageProps {
    stats: Stats;
    recentUsers: Pick<User, 'id' | 'name' | 'email' | 'plan' | 'invoice_count'>[];
}

export default function AdminDashboard({ stats, recentUsers }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin</h1>
                            <p className="text-sm text-gray-500">Kelola sistem InvoKit</p>
                        </div>
                        <Link
                            href={route('admin.users')}
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="hidden sm:inline">Kelola</span> Users
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                            <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.total_users}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                            <p className="text-xs sm:text-sm text-gray-500">Free</p>
                            <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">{stats.free_users}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                            <p className="text-xs sm:text-sm text-gray-500">Pro</p>
                            <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.paid_users}</p>
                            {stats.paid_users > 0 && (
                                <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                                    Rp{(stats.paid_users * 29000).toLocaleString('id-ID')}/bln
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">User Terbaru</h3>
                            <Link href={route('admin.users')} className="text-sm text-green-600 font-medium">
                                Lihat semua
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-600 font-medium">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                                        <span className="text-xs text-gray-400 hidden sm:block">
                                            {user.invoice_count} inv
                                        </span>
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
