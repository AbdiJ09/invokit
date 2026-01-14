import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru 🚀</h1>
                    <p className="text-gray-500 mt-1">Gratis 3 invoice pertama</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Minimal 8 karakter"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Konfirmasi Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Ulangi password"
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-xl bg-green-600 py-3.5 text-base font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50 shadow-lg shadow-green-600/25"
                    >
                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-semibold text-green-600 hover:text-green-700">
                            Masuk
                        </Link>
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-400">
                        Dengan mendaftar, Anda menyetujui ketentuan layanan kami
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
