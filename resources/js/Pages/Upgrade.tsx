import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    user: {
        plan: 'free' | 'paid';
        invoice_count: number;
    };
}

export default function Upgrade({ user }: Props) {
    const [copiedBank, setCopiedBank] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2000);
    };

    if (user.plan === 'paid') {
        return (
            <AuthenticatedLayout>
                <Head title="Upgrade" />

                <div className="py-8 sm:py-12">
                    <div className="mx-auto max-w-md px-4 sm:px-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🎉</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Anda sudah Pro!</h3>
                            <p className="text-gray-600 mb-6">
                                Nikmati invoice unlimited dan fitur premium lainnya.
                            </p>
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Upgrade ke Pro" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Upgrade ke Pro 🚀
                        </h1>
                        <p className="text-gray-600">
                            Anda sudah pakai {user.invoice_count} dari 3 invoice gratis
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative">
                            <p className="text-green-200 text-sm font-medium">Paket Pro</p>
                            <div className="flex items-baseline gap-1 mt-1 mb-4">
                                <span className="text-4xl sm:text-5xl font-bold">Rp29.000</span>
                                <span className="text-green-200">/ bulan</span>
                            </div>
                            <ul className="space-y-2.5">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Invoice unlimited</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Client unlimited</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>3 template pesan profesional</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Support via WhatsApp</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>

                        {/* Bank Transfer */}
                        <div className="border border-gray-200 rounded-xl p-4 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl">🏦</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Transfer Bank</p>
                                    <p className="text-sm text-gray-500">BCA</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-mono text-lg font-bold text-gray-900">1234567890</p>
                                        <p className="text-sm text-gray-500">a.n. InvoKit</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard('1234567890')}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        {copiedBank ? '✓ Tersalin' : 'Salin'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* QRIS */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl">📱</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">QRIS</p>
                                    <p className="text-sm text-gray-500">Scan dengan OVO/GoPay/DANA</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <div className="w-40 h-40 bg-white border-2 border-dashed border-gray-300 rounded-xl mx-auto flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">[QRIS Code]</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-3">Nominal: Rp29.000</p>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-6">
                        <h4 className="font-medium text-amber-800 mb-2">Setelah Transfer:</h4>
                        <ol className="text-sm text-amber-700 space-y-1.5 list-decimal list-inside">
                            <li>Screenshot bukti transfer</li>
                            <li>Kirim ke WA <span className="font-medium">+62 812-xxxx-xxxx</span></li>
                            <li>Akun diaktifkan maks 1x24 jam</li>
                        </ol>
                    </div>

                    <div className="text-center">
                        <Link
                            href={route('dashboard')}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            ← Kembali ke Dashboard
                        </Link>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
