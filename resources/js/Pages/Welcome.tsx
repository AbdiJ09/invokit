import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="InvoKit - Nagih Invoice via WhatsApp" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-sm">
                                    IK
                                </div>
                                <span className="font-semibold text-gray-900">InvoKit</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                                        >
                                            Coba Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/40 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Nagih Invoice Client
                                <span className="block text-green-600 mt-1">Langsung via WhatsApp</span>
                            </h1>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                                Bikin invoice, pilih template, klik tombol - langsung buka WhatsApp dengan pesan siap kirim. Simple banget.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-semibold text-white hover:bg-green-700 transition shadow-lg shadow-green-600/25"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Mulai Gratis
                                </Link>
                                <a
                                    href="#features"
                                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gray-100 px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Lihat Fitur
                                </a>
                            </div>
                            <p className="mt-4 text-sm text-gray-400">
                                ✓ 3 invoice gratis &nbsp; ✓ Tanpa kartu kredit
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div id="features" className="py-16 sm:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kenapa InvoKit?</h2>
                            <p className="mt-3 text-gray-600">Dibuat khusus untuk freelancer Indonesia</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Super Cepat</h3>
                                <p className="text-sm text-gray-600">
                                    Buat invoice dalam 30 detik. Langsung kirim via WhatsApp tanpa copy-paste manual.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Template Siap Pakai</h3>
                                <p className="text-sm text-gray-600">
                                    3 template berbeda: reminder (H-1), follow up (H+1), dan tegas (H+7). Tinggal pilih.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Track Status</h3>
                                <p className="text-sm text-gray-600">
                                    Lihat mana invoice yang draft, terkirim, atau sudah lunas. Dashboard yang jelas.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔔</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Alert Overdue</h3>
                                <p className="text-sm text-gray-600">
                                    Invoice yang lewat jatuh tempo langsung muncul di dashboard. Gak ada yang kelewat.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Mobile First</h3>
                                <p className="text-sm text-gray-600">
                                    Didesain untuk HP. Bisa nagih invoice dari mana aja, kapan aja.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">💚</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Via WhatsApp</h3>
                                <p className="text-sm text-gray-600">
                                    Client gak perlu install app. Terima invoice langsung di WA mereka.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Template Preview */}
                <div className="py-16 sm:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Template Profesional</h2>
                            <p className="mt-3 text-gray-600">Pesan yang sopan tapi tetap tegas</p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold">H-1</span>
                                    <span className="text-sm text-gray-600">Reminder</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    "Halo Pak/Bu, mengingatkan invoice yang jatuh tempo besok..."
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded-lg bg-orange-100 text-orange-700 text-xs font-semibold">H+1</span>
                                    <span className="text-sm text-gray-600">Follow Up</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    "Halo Pak/Bu, kami follow up invoice yang jatuh tempo kemarin..."
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold">H+7</span>
                                    <span className="text-sm text-gray-600">Tegas</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    "Halo Pak/Bu, mengingatkan kembali invoice yang belum diterima..."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="py-16 sm:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Harga Simple</h2>
                            <p className="mt-3 text-gray-600">Mulai gratis, upgrade kalau butuh</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                                <h3 className="font-bold text-gray-900 text-lg">Free</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">Rp0</p>
                                <p className="text-gray-500 text-sm mt-1">Selamanya</p>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        3 invoice
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Client unlimited
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        3 template
                                    </li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="mt-6 block w-full text-center rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Mulai Gratis
                                </Link>
                            </div>

                            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="relative">
                                    <h3 className="font-bold text-lg">Pro</h3>
                                    <p className="text-3xl font-bold mt-2">Rp29.000</p>
                                    <p className="text-green-200 text-sm mt-1">per bulan</p>
                                    <ul className="mt-6 space-y-3">
                                        <li className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Invoice unlimited
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Client unlimited
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Support via WA
                                        </li>
                                    </ul>
                                    <Link
                                        href={route('register')}
                                        className="mt-6 block w-full text-center rounded-xl bg-white py-3 text-sm font-semibold text-green-600 hover:bg-green-50 transition"
                                    >
                                        Coba Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="py-16 sm:py-24 bg-gray-900">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Siap nagih invoice tanpa ribet?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Join ratusan freelancer Indonesia yang sudah pakai InvoKit
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-semibold text-white hover:bg-green-700 transition shadow-lg"
                        >
                            Mulai Sekarang — Gratis
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 bg-gray-900 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-sm">
                                    IK
                                </div>
                                <span className="font-semibold text-white">InvoKit</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                © 2026 InvoKit. Made for Indonesian freelancers.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
