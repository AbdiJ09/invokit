import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { FormEventHandler, useState } from 'react';

interface Props extends PageProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    const user = usePage<PageProps>().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">Kelola informasi akun Anda</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-20" />
                        <div className="px-4 sm:px-6 pb-6 -mt-10">
                            <div className="flex items-end gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold text-green-600 border-4 border-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="pb-1">
                                    <h2 className="font-semibold text-gray-900">{user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                {user.plan === 'paid' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                        ✓ Pro
                                    </span>
                                ) : (
                                    <Link
                                        href={route('upgrade')}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                                    >
                                        Free • Upgrade
                                    </Link>
                                )}
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    {user.invoice_count} invoice terkirim
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Update Profile */}
                    <UpdateProfileForm user={user} mustVerifyEmail={mustVerifyEmail} status={status} />

                    {/* Update Password */}
                    <UpdatePasswordForm />

                    {/* Delete Account */}
                    <DeleteAccountForm />

                    {/* Bottom spacing for mobile */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function UpdateProfileForm({ user, mustVerifyEmail, status }: { user: User; mustVerifyEmail: boolean; status?: string }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        whatsapp_number: user.whatsapp_number || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-4">Informasi Profile</h3>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nama
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nomor WhatsApp (opsional)
                    </label>
                    <input
                        id="whatsapp_number"
                        type="tel"
                        value={data.whatsapp_number}
                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        placeholder="628123456789"
                    />
                    {errors.whatsapp_number && <p className="mt-1 text-sm text-red-600">{errors.whatsapp_number}</p>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    {recentlySuccessful && (
                        <span className="text-sm text-green-600">Tersimpan!</span>
                    )}
                </div>
            </form>
        </div>
    );
}

function UpdatePasswordForm() {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-4">Ubah Password</h3>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password Saat Ini
                    </label>
                    <input
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password Baru
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Konfirmasi Password Baru
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Ubah Password'}
                    </button>
                    {recentlySuccessful && (
                        <span className="text-sm text-green-600">Tersimpan!</span>
                    )}
                </div>
            </form>
        </div>
    );
}

function DeleteAccountForm() {
    const [confirming, setConfirming] = useState(false);
    const { data, setData, errors, delete: destroy, processing, reset } = useForm({
        password: '',
    });

    const confirmDeletion = () => setConfirming(true);
    const closeModal = () => {
        setConfirming(false);
        reset();
    };

    const deleteAccount: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-4 sm:p-6">
                <h3 className="font-semibold text-red-600 mb-2">Hapus Akun</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Setelah akun dihapus, semua data akan dihapus permanen. Pastikan Anda sudah backup data penting.
                </p>
                <button
                    onClick={confirmDeletion}
                    className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                    Hapus Akun
                </button>
            </div>

            {confirming && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end sm:items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-900/50" onClick={closeModal} />

                        <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Yakin hapus akun?
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Masukkan password untuk konfirmasi penghapusan akun.
                            </p>

                            <form onSubmit={deleteAccount}>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 mb-4"
                                    placeholder="Password"
                                    autoFocus
                                />
                                {errors.password && (
                                    <p className="mb-4 text-sm text-red-600">{errors.password}</p>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menghapus...' : 'Hapus Akun'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
