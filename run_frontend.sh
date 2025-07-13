#!/bin/bash

echo "🚀 Запуск Pixel-Guess Trainer Frontend"
echo "=========================================="

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Пожалуйста, установите Node.js"
    echo "💡 Скачайте с https://nodejs.org/"
    exit 1
fi

# Проверка npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Пожалуйста, установите npm"
    exit 1
fi

# Переход в папку frontend
cd frontend

# Установка зависимостей
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Запуск сервера разработки
echo "🎯 Запуск сервера разработки на http://localhost:3000"
echo "🔄 Автоматическая перезагрузка включена"
echo "⚠️  Для остановки сервера нажмите Ctrl+C"
echo "=========================================="

npm start 