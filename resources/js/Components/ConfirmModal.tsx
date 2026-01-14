import { Fragment, useState, createContext, useContext, ReactNode } from 'react';

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'default';
    onConfirm: () => void;
    onCancel?: () => void;
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within ConfirmProvider');
    }
    return context.confirm;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions | null>(null);

    const confirm = (opts: ConfirmOptions) => {
        setOptions(opts);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        options?.onConfirm();
        setIsOpen(false);
        setOptions(null);
    };

    const handleCancel = () => {
        options?.onCancel?.();
        setIsOpen(false);
        setOptions(null);
    };

    const variantStyles = {
        danger: {
            icon: '🗑️',
            iconBg: 'bg-red-100',
            button: 'bg-red-600 hover:bg-red-700',
        },
        warning: {
            icon: '⚠️',
            iconBg: 'bg-amber-100',
            button: 'bg-amber-600 hover:bg-amber-700',
        },
        default: {
            icon: '❓',
            iconBg: 'bg-gray-100',
            button: 'bg-green-600 hover:bg-green-700',
        },
    };

    const variant = options?.variant || 'default';
    const styles = variantStyles[variant];

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {/* Modal Overlay */}
            {isOpen && options && (
                <div className="fixed inset-0 z-[100] overflow-y-auto">
                    <div className="flex min-h-full items-end sm:items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                            onClick={handleCancel}
                        />

                        {/* Modal */}
                        <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
                            <div className="text-center">
                                {/* Icon */}
                                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${styles.iconBg} mb-4`}>
                                    <span className="text-2xl">{styles.icon}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {options.title}
                                </h3>

                                {/* Message */}
                                <p className="text-sm text-gray-600 mb-6">
                                    {options.message}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        {options.cancelText || 'Batal'}
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className={`flex-1 rounded-xl py-3 text-sm font-semibold text-white transition ${styles.button}`}
                                    >
                                        {options.confirmText || 'Ya, Lanjutkan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}
