# Pixel Guess - Telegram Mini App

Игра на угадывание направления движения цены для Telegram Mini Apps.

## 🎮 Описание

Pixel Guess - это игра, где игроки должны угадать направление движения цены за 3 секунды. Игра интегрирована в Telegram как Mini App.

## 🚀 Функции

- 🎯 Угадывание направления цены (UP/DOWN)
- 💰 Система ставок и баланса
- 📱 Полная интеграция с Telegram
- 🎵 Haptic feedback (вибрация)
- 📊 Статистика игр
- 👤 Персональные данные из Telegram

## 🛠 Технологии

### Frontend

- React + TypeScript
- Telegram Web App SDK
- CSS3 с адаптивным дизайном

### Backend

- FastAPI (Python)
- Telegram Bot API
- Асинхронная архитектура

## 📦 Деплой

### 🚀 Единое развертывание на Railway (Рекомендуется)

Проект настроен для развертывания всего приложения на Railway:

1. **Подключите репозиторий к Railway**
2. **Добавьте переменные окружения** (см. `railway.env.example`)
3. **Railway автоматически соберет и запустит** и фронтенд, и бэкенд

Подробная инструкция: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Альтернативное развертывание

1. **Frontend (Vercel):**
   - Форкните репозиторий
   - Подключите к Vercel
   - Добавьте переменную `REACT_APP_API_URL`

2. **Backend (Railway):**
   - Подключите репозиторий к Railway
   - Добавьте переменные окружения
   - Автоматически задеплоится

### Локальная разработка

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm start
```

## 🔧 Настройка

1. Создайте бота через @BotFather
2. Настройте URL Mini App в @BotFather
3. Добавьте переменные окружения
4. Запустите приложение

## 📝 Переменные окружения

### Backend

```
BOT_TOKEN=your_telegram_bot_token
WEB_APP_URL=https://your-frontend-url.vercel.app
TELEGRAM_BOT_SECRET=your_telegram_bot_token
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

## 📱 Тестирование

1. Откройте вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите кнопку "🎮 Играть в Pixel Guess"
4. Играйте!

## 🤝 Вклад в проект

Pull requests приветствуются! Для крупных изменений сначала откройте issue.

## 📄 Лицензия

MIT License
