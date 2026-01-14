#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Run migrations
echo "📦 Running migrations..."
php artisan migrate --force

# Seed database (optional, uncomment if needed)
# echo "🌱 Seeding database..."
# php artisan db:seed --force

# Start application
echo "🔥 Starting server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
