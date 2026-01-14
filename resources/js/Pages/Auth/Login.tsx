import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Selamat Datang! 👋</h1>
                    <p className="text-gray-500 mt-1">Masuk ke akun Anda</p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
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
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-green-600 hover:text-green-700"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 py-3"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                            Ingat saya
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-xl bg-green-600 py-3.5 text-base font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50 shadow-lg shadow-green-600/25"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="font-semibold text-green-600 hover:text-green-700">
                            Daftar gratis
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
