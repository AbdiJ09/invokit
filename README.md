# InvoKit

Nagih invoice client langsung via WhatsApp. Dibuat khusus untuk freelancer Indonesia.

## Features

-   ⚡ **Buat invoice cepat** - 30 detik langsung kirim
-   📝 **3 template siap pakai** - H-1 reminder, H+1 follow up, H+7 tegas
-   📊 **Dashboard lengkap** - Track status draft, terkirim, lunas
-   🔔 **Alert overdue** - Invoice telat langsung muncul
-   📱 **Mobile first** - Didesain untuk HP
-   💚 **Via WhatsApp** - Client terima langsung di WA

## Tech Stack

-   **Backend**: Laravel 11
-   **Frontend**: React + TypeScript + Inertia.js
-   **Database**: PostgreSQL
-   **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

-   PHP 8.2+
-   Node.js 18+
-   PostgreSQL
-   Composer

### Installation

```bash
# Clone repo
git clone <repo-url>
cd invoice-project

# Install dependencies
composer install
npm install

# Copy environment
cp .env.example .env

# Generate key
php artisan key:generate

# Setup database (edit .env first)
php artisan migrate --seed

# Build assets
npm run build

# Start server
php artisan serve
```

### Development

```bash
# Terminal 1 - Backend
php artisan serve

# Terminal 2 - Frontend (hot reload)
npm run dev
```

## Default Users

After seeding:

| Email             | Password | Role  |
| ----------------- | -------- | ----- |
| admin@invokit.com | password | Admin |
| test@example.com  | password | User  |

## Pricing

-   **Free**: 3 invoice gratis, client unlimited
-   **Pro**: Rp29.000/bulan, invoice unlimited

## License

MIT
