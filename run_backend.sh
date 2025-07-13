#!/bin/bash

echo "🚀 Запуск Pixel-Guess Trainer Backend"
echo "=========================================="

# Проверка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не найден. Пожалуйста, установите Python3"
    exit 1
fi

# Переход в папку backend
cd backend

# Создание виртуального окружения, если его нет
if [ ! -d "venv" ]; then
    echo "📦 Создание виртуального окружения..."
    python3 -m venv venv
fi

# Активация виртуального окружения
echo "🔄 Активация виртуального окружения..."
source venv/bin/activate

# Установка зависимостей
echo "📥 Установка зависимостей..."
pip install -r requirements.txt

# Запуск сервера
echo "🎯 Запуск сервера на http://localhost:8000"
echo "📄 Документация API: http://localhost:8000/docs"
echo "⚠️  Для остановки сервера нажмите Ctrl+C"
echo "=========================================="

python -m app.main 