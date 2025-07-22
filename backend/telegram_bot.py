import os
import logging
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Загружаем переменные окружения из .env файла
load_dotenv()

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# URL вашего веб-приложения
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://your-domain.com")
BOT_TOKEN = os.getenv("BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    
    # Создаем кнопку для запуска Mini App
    keyboard = [
        [
            InlineKeyboardButton(
                text="🎮 Играть в Pixel Guess",
                web_app=WebAppInfo(url=WEB_APP_URL)
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        f"Привет, {user.mention_html()}! 👋\n\n"
        "Добро пожаловать в Pixel Guess - игру, где нужно угадать направление движения цены!\n\n"
        "🎯 Правила просты:\n"
        "• У вас есть 3 секунды\n"
        "• Угадайте куда пойдет цена - вверх или вниз\n"
        "• Выигрывайте фишки и соревнуйтесь с друзьями!\n\n"
        "Нажмите кнопку ниже, чтобы начать игру:",
        reply_markup=reply_markup,
        parse_mode='HTML'
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    await update.message.reply_text(
        "🎮 <b>Pixel Guess - Помощь</b>\n\n"
        "Это игра на интуицию и скорость реакции!\n\n"
        "<b>Как играть:</b>\n"
        "1. Нажмите кнопку 'Играть'\n"
        "2. Выберите размер ставки\n"
        "3. Посмотрите на график\n"
        "4. За 3 секунды угадайте направление\n"
        "5. Выигрывайте или теряйте фишки\n\n"
        "<b>Команды:</b>\n"
        "/start - Начать игру\n"
        "/help - Показать помощь\n"
        "/stats - Статистика (скоро)",
        parse_mode='HTML'
    )

def main() -> None:
    """Запуск бота"""
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()

    # Регистрируем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))

    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main() 