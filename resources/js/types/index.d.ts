export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    whatsapp_number?: string;
    plan: 'free' | 'paid';
    invoice_count: number;
    is_admin: boolean;
}

export interface Client {
    id: number;
    user_id: number;
    client_name: string;
    client_whatsapp: string;
    invoices_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Invoice {
    id: number;
    user_id: number;
    client_id: number;
    amount: string;
    description: string;
    due_date?: string;
    status: 'draft' | 'sent' | 'paid';
    sent_at?: string;
    created_at: string;
    updated_at: string;
    client?: Client;
    formatted_amount?: string;
}

export interface UserPlanInfo {
    plan: 'free' | 'paid';
    invoice_count: number;
    can_send_invoice: boolean;
    invoices_remaining?: number | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};

