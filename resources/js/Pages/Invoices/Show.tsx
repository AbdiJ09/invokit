import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Invoice, UserPlanInfo } from '@/types';
import { useState } from 'react';
import { useConfirm } from '@/Components/ConfirmModal';
import axios from 'axios';

interface Props extends PageProps {
    invoice: Invoice;
    templates: Record<string, string>;
    suggestedTemplate: string;
    user: UserPlanInfo;
}

export default function InvoicesShow({ invoice, templates, suggestedTemplate, user }: Props) {
    const confirm = useConfirm();
    const [selectedTemplate, setSelectedTemplate] = useState(suggestedTemplate);
    const [customMessage, setCustomMessage] = useState(templates[suggestedTemplate]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showTemplateEditor, setShowTemplateEditor] = useState(false);

    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return 'Rp' + num.toLocaleString('id-ID');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const handleTemplateChange = (key: string) => {
        setSelectedTemplate(key);
        setCustomMessage(templates[key]);
    };

    const resetToDefault = () => {
        setCustomMessage(templates[selectedTemplate]);
    };

    const handleSendWhatsApp = async () => {
        if (!user.can_send_invoice && invoice.status === 'draft') {
            setShowUpgradeModal(true);
            return;
        }

        setIsGenerating(true);

        try {
            const response = await axios.post(route('invoices.wa-link', invoice.id), {
                message: customMessage,
            });

            if (invoice.status === 'draft') {
                router.post(route('invoices.send', invoice.id), {}, {
                    preserveState: true,
                    onSuccess: () => {
                        window.open(response.data.link, '_blank');
                    },
                });
            } else {
                window.open(response.data.link, '_blank');
            }
        } catch (error) {
            console.error('Error generating WA link:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleMarkPaid = () => {
        confirm({
            title: 'Tandai Lunas?',
            message: `Tandai invoice untuk ${invoice.client?.client_name} sebagai sudah dibayar?`,
            confirmText: 'Ya, Lunas',
            cancelText: 'Batal',
            variant: 'default',
            onConfirm: () => {
                router.post(route('invoices.mark-paid', invoice.id));
            },
        });
    };

    const templateLabels: Record<string, { label: string; badge: string; badgeColor: string }> = {
        'h-1': { label: 'Reminder sebelum jatuh tempo', badge: 'H-1', badgeColor: 'bg-amber-100 text-amber-700' },
        'h+1': { label: 'Follow up lewat 1 hari', badge: 'H+1', badgeColor: 'bg-orange-100 text-orange-700' },
        'h+7': { label: 'Tegas tapi aman', badge: 'H+7', badgeColor: 'bg-red-100 text-red-700' },
    };

    const previewMessage = customMessage
        .replace('[Nama]', invoice.client?.client_name || '')
        .replace('[Nominal]', formatCurrency(invoice.amount))
        .replace('[Deskripsi]', invoice.description);

    return (
        <AuthenticatedLayout>
            <Head title={`Invoice - ${invoice.client?.client_name}`} />

            <div className="py-4 sm:py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Back Button - Mobile */}
                    <Link
                        href={route('invoices.index')}
                        className="inline-flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>

                    {/* Invoice Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                                            {invoice.client?.client_name}
                                        </h1>
                                        {getStatusBadge(invoice.status)}
                                    </div>
                                    <a
                                        href={`https://wa.me/${invoice.client?.client_whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mt-1"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        +62 {invoice.client?.client_whatsapp.slice(2)}
                                    </a>
                                </div>
                                {invoice.status === 'draft' && (
                                    <Link
                                        href={route('invoices.edit', invoice.id)}
                                        className="flex-shrink-0 text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Edit
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-4 sm:p-6">
                            <p className="text-gray-600 mb-4">{invoice.description}</p>

                            <div className="flex flex-wrap gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">Nominal</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                                </div>
                                {invoice.due_date && (
                                    <div>
                                        <p className="text-sm text-gray-500">Jatuh Tempo</p>
                                        <p className="text-lg font-medium text-gray-900">{formatDate(invoice.due_date)}</p>
                                    </div>
                                )}
                            </div>

                            {invoice.sent_at && (
                                <p className="text-sm text-gray-400 mt-4">
                                    Terkirim: {formatDate(invoice.sent_at)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Template Section - Only if not paid */}
                    {invoice.status !== 'paid' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900">Template Pesan</h2>
                                <button
                                    onClick={() => setShowTemplateEditor(!showTemplateEditor)}
                                    className="text-sm text-green-600 font-medium"
                                >
                                    {showTemplateEditor ? 'Tutup' : 'Edit'}
                                </button>
                            </div>

                            {/* Template Selector */}
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {Object.entries(templateLabels).map(([key, { badge, badgeColor }]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleTemplateChange(key)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
                                            selectedTemplate === key
                                                ? `${badgeColor} ring-2 ring-offset-1 ring-current`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {badge}
                                    </button>
                                ))}
                            </div>

                            <p className="text-sm text-gray-500 mb-3">
                                {templateLabels[selectedTemplate]?.label}
                            </p>

                            {/* Message Preview/Editor */}
                            {showTemplateEditor ? (
                                <div>
                                    <div className="relative mb-2">
                                        <textarea
                                            value={customMessage}
                                            onChange={(e) => setCustomMessage(e.target.value)}
                                            rows={5}
                                            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-400">
                                            Placeholder: [Nama], [Nominal], [Deskripsi]
                                        </p>
                                        <button
                                            onClick={resetToDefault}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <p className="text-sm text-green-900 whitespace-pre-line">{previewMessage}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        {invoice.status !== 'paid' && (
                            <button
                                onClick={handleSendWhatsApp}
                                disabled={isGenerating}
                                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-lg font-semibold text-white hover:bg-green-700 transition shadow-lg shadow-green-600/25 disabled:opacity-50"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                {isGenerating ? 'Membuka WhatsApp...' : 'Nagih via WhatsApp'}
                            </button>
                        )}

                        {invoice.status === 'sent' && (
                            <button
                                onClick={handleMarkPaid}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-100 px-6 py-4 text-base font-semibold text-gray-700 hover:bg-gray-200 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Tandai Lunas
                            </button>
                        )}

                        {invoice.status === 'paid' && (
                            <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-green-800">Invoice Lunas</p>
                                <p className="text-sm text-green-600 mt-1">Pembayaran sudah diterima</p>
                            </div>
                        )}
                    </div>

                    {/* Info text */}
                    {invoice.status === 'draft' && (
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Invoice akan ditandai "Terkirim" setelah klik tombol di atas
                        </p>
                    )}

                    {/* Bottom spacing */}
                    <div className="h-20 sm:h-0" />
                </div>
            </div>

            {/* Upgrade Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end sm:items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)} />

                        <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl">
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mb-4">
                                    <span className="text-3xl">🚀</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Batas Invoice Tercapai
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Upgrade ke Pro untuk invoice unlimited
                                </p>
                                <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
                                    <p className="text-3xl font-bold text-green-600">Rp29.000</p>
                                    <p className="text-sm text-green-700">per bulan</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowUpgradeModal(false)}
                                        className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Nanti
                                    </button>
                                    <Link
                                        href={route('upgrade')}
                                        className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition text-center"
                                    >
                                        Upgrade
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
