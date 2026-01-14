import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { PageProps } from '@/types';

export default function Authenticated({ children }: PropsWithChildren) {
    const { auth, flash } = usePage<PageProps>().props;
    const user = auth.user;

    const [showFlash, setShowFlash] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const currentPath = window.location.pathname;

    const isActive = (path: string) => {
        if (path === '/dashboard') return currentPath === '/dashboard';
        return currentPath.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0">
            {/* Desktop Header */}
            <nav className="hidden sm:block bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-sm">
                                    IK
                                </div>
                                <span className="font-semibold text-gray-900">InvoKit</span>
                            </Link>

                            <div className="flex items-center gap-1">
                                <Link
                                    href={route('dashboard')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive('/dashboard')
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('clients.index')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive('/clients')
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Clients
                                </Link>
                                <Link
                                    href={route('invoices.index')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive('/invoices')
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Invoices
                                </Link>
                                {user.is_admin && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            isActive('/admin')
                                                ? 'bg-purple-50 text-purple-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Admin
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Plan Badge */}
                            {user.plan === 'free' ? (
                                <Link
                                    href={route('upgrade')}
                                    className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 hover:bg-amber-200 transition"
                                >
                                    Free • {Math.max(0, 3 - user.invoice_count)} tersisa
                                </Link>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                    Pro ✓
                                </span>
                            )}

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-green-700 font-medium text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden lg:block">{user.name}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showMobileMenu && (
                                    <>
                                        <div className="fixed inset-0" onClick={() => setShowMobileMenu(false)} />
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <nav className="sm:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-sm">
                            IK
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        {user.plan === 'free' ? (
                            <Link
                                href={route('upgrade')}
                                className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800"
                            >
                                {Math.max(0, 3 - user.invoice_count)} tersisa
                            </Link>
                        ) : (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                                Pro
                            </span>
                        )}

                        <Link
                            href={route('profile.edit')}
                            className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
                        >
                            <span className="text-green-700 font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {showFlash && flash && (
                <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md z-50">
                    {flash.success && (
                        <div className="rounded-xl bg-green-600 text-white p-4 shadow-lg flex items-center gap-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium flex-1">{flash.success}</p>
                            <button onClick={() => setShowFlash(false)} className="text-white/80 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                    {flash.error && (
                        <div className="rounded-xl bg-red-600 text-white p-4 shadow-lg flex items-center gap-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium flex-1">{flash.error}</p>
                            <button onClick={() => setShowFlash(false)} className="text-white/80 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Main Content */}
            <main>{children}</main>

            {/* Mobile Bottom Navigation */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
                <div className="grid grid-cols-4 h-16">
                    <Link
                        href={route('dashboard')}
                        className={`flex flex-col items-center justify-center gap-1 ${
                            isActive('/dashboard') ? 'text-green-600' : 'text-gray-400'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-xs font-medium">Home</span>
                    </Link>
                    <Link
                        href={route('clients.index')}
                        className={`flex flex-col items-center justify-center gap-1 ${
                            isActive('/clients') ? 'text-green-600' : 'text-gray-400'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-xs font-medium">Clients</span>
                    </Link>
                    <Link
                        href={route('invoices.index')}
                        className={`flex flex-col items-center justify-center gap-1 ${
                            isActive('/invoices') ? 'text-green-600' : 'text-gray-400'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-medium">Invoice</span>
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className={`flex flex-col items-center justify-center gap-1 ${
                            isActive('/profile') ? 'text-green-600' : 'text-gray-400'
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs font-medium">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
