# Настройка Pixel Guess как Telegram Mini App

## Шаг 1: Создание Telegram бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/botfather)
2. Отправьте команду `/newbot`
3. Введите название бота (например: "Pixel Guess Game")
4. Введите username бота (должен заканчиваться на "bot", например: `pixel_guess_game_bot`)
5. Сохраните полученный токен (выглядит как: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

## Шаг 2: Настройка Mini App

1. В чате с @BotFather отправьте команду `/mybots`
2. Выберите вашего бота
3. Нажмите "Bot Settings" → "Menu Button" → "Edit menu button URL"
4. Введите URL вашего веб-приложения (например: `https://your-domain.com`)

## Шаг 3: Настройка Backend

1. Скопируйте файл `backend/env.example` в `backend/.env`:

   ```bash
   cp backend/env.example backend/.env
   ```

2. Отредактируйте `backend/.env`:

   ```
   BOT_TOKEN=ВАШ_ТОКЕН_БОТА
   WEB_APP_URL=https://your-domain.com
   TELEGRAM_BOT_SECRET=ВАШ_ТОКЕН_БОТА
   ```

3. Установите зависимости:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # На Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Запустите бота:

   ```bash
   python telegram_bot.py
   ```

5. Запустите API сервер:
   ```bash
   uvicorn app.main:app --reload
   ```

## Шаг 4: Настройка Frontend

1. Установите зависимости:

   ```bash
   cd frontend
   npm install
   ```

2. Для локальной разработки используйте ngrok:

   ```bash
   ngrok http 3000
   ```

3. Запустите приложение:
   ```bash
   npm start
   ```

## Шаг 5: Тестирование

1. Откройте вашего бота в Telegram
2. Нажмите кнопку "Menu" или отправьте `/start`
3. Нажмите "🎮 Играть в Pixel Guess"
4. Приложение откроется внутри Telegram!

## Развертывание в Production

### Frontend

- Соберите production build: `npm run build`
- Разместите на любом хостинге (Vercel, Netlify, GitHub Pages)
- Убедитесь, что домен использует HTTPS

### Backend

- Используйте виртуальный сервер (VPS) или облачную платформу
- Настройте HTTPS (обязательно для Telegram)
- Используйте процесс-менеджер (PM2, systemd) для запуска

### Важные замечания:

- Telegram Mini Apps работают только через HTTPS
- Для тестирования используйте ngrok или подобные сервисы
- Храните токен бота в безопасности
- Регулярно проверяйте логи на наличие ошибок

## Полезные ссылки:

- [Документация Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [@BotFather](https://t.me/botfather) - для управления ботами
- [Telegram Web Apps Demo Bot](https://t.me/DemoTestAppBot) - пример Mini App
