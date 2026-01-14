# InvoKit - Railway Deployment Guide

## Environment Variables (Set in Railway Dashboard)

```
APP_NAME=InvoKit
APP_ENV=production
APP_KEY=base64:... (generate with: php artisan key:generate --show)
APP_DEBUG=false
APP_URL=https://your-app.railway.app

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=pgsql
# Railway auto-provides: DATABASE_URL, PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

## Deploy Steps

1. Push code to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Select this repo
4. Add PostgreSQL database (Add → Database → PostgreSQL)
5. Set environment variables above
6. Deploy!

## Post-Deploy

Run in Railway's shell:

```bash
php artisan migrate --seed
```
