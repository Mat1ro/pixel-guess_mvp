#!/bin/bash

echo "🧪 Тестирование сборки Pixel Guess"
echo "===================================="

# Проверка зависимостей
echo "📋 Проверка зависимостей..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не найден"
    exit 1
fi

# Установка зависимостей бэкенда
echo "📦 Установка зависимостей бэкенда..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Установка зависимостей фронтенда
echo "📦 Установка зависимостей фронтенда..."
cd frontend
npm install
cd ..

# Сборка фронтенда
echo "🏗️ Сборка фронтенда..."
cd frontend
REACT_APP_API_URL=/api npm run build
cd ..

# Копирование статических файлов
echo "📁 Копирование статических файлов..."
mkdir -p backend/static
cp -r frontend/build/* backend/static/

# Проверка результата
echo "✅ Сборка завершена!"
echo "📂 Статические файлы в: backend/static/"
ls -la backend/static/

echo ""
echo "🚀 Для запуска локально:"
echo "cd backend && source venv/bin/activate && python -m app.main" 