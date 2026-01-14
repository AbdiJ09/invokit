import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-4 sm:p-6">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold">
                            IK
                        </div>
                        <span className="font-semibold text-gray-900 text-lg">InvoKit</span>
                    </Link>
                </header>

                {/* Content */}
                <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-4 sm:p-6 text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 InvoKit
                    </p>
                </footer>
            </div>
        </div>
    );
}
