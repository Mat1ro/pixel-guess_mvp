# 🚀 Развертывание Pixel Guess на Railway

## Проблема, которую мы решили

Railway/Nixpacks не мог определить тип проекта, поскольку в корне не было основных файлов конфигурации.

## Что было добавлено

1. **package.json** в корне проекта
2. **nixpacks.toml** - конфигурация сборки
3. Обновлены файлы backend для обслуживания фронтенда
4. **railway.env.example** - пример переменных окружения

## 📝 Пошаговое развертывание

### 1. Подготовка проекта

Все необходимые файлы уже созданы и настроены.

### 2. Настройка в Railway

1. Перейдите на [railway.app](https://railway.app)
2. Подключите ваш GitHub репозиторий
3. Railway автоматически обнаружит nixpacks.toml и начнет сборку

### 3. Настройка переменных окружения

В панели Railway добавьте следующие переменные:

```bash
BOT_TOKEN=ваш_токен_бота
TELEGRAM_BOT_SECRET=ваш_токен_бота
WEB_APP_URL=https://ваш-домен.railway.app
FRONTEND_URL=https://ваш-домен.railway.app
PORT=8000
REACT_APP_API_URL=https://ваш-домен.railway.app/api
```

### 4. Получение токена бота

1. Найдите @BotFather в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните полученный токен

### 5. Настройка Mini App

1. Отправьте @BotFather команду `/mybots`
2. Выберите вашего бота
3. Нажмите "Bot Settings" → "Menu Button"
4. Введите URL: `https://ваш-домен.railway.app`

### 6. Тестирование

1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите кнопку меню (должна открыться игра)

## 🔧 Структура сборки

1. **Setup**: Устанавливаются Python 3.9 и Node.js 18
2. **Install**: Устанавливаются зависимости backend и frontend
3. **Build**: Собирается frontend и копируется в backend/static
4. **Start**: Запускается FastAPI с Gunicorn

## 🚨 Возможные проблемы

### Ошибка сборки

- Проверьте логи в Railway
- Убедитесь, что все зависимости указаны правильно

### Mini App не открывается

- Проверьте URL в настройках бота
- Убедитесь, что CORS настроен правильно

### API недоступно

- Проверьте переменные окружения
- Убедитесь, что healthcheck проходит: `/health`

## 📞 Поддержка

Если возникли проблемы:

1. Проверьте логи в Railway Dashboard
2. Убедитесь, что все переменные окружения настроены
3. Протестируйте API через `/docs` эндпоинт
