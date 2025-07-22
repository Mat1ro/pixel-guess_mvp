from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from ..models.game import AnswerRequest, AnswerResponse, NewGameResponse
from ..services.game_service import game_service
from ..services.telegram_auth import telegram_auth

game_router = APIRouter()

def get_user_id_from_header(x_telegram_init_data: Optional[str] = Header(None)) -> int:
    """Извлекает user_id из Telegram init data или возвращает тестовый ID"""
    if x_telegram_init_data:
        user_id = telegram_auth.get_user_id_from_init_data(x_telegram_init_data)
        if user_id:
            return user_id
    # Возвращаем тестовый ID для разработки
    return 12345

@game_router.get("/game/new", response_model=NewGameResponse)
async def get_new_game():
    """Получение нового игрового раунда"""
    try:
        return game_service.create_new_game()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.post("/game/answer", response_model=AnswerResponse)
async def submit_answer(
    answer: AnswerRequest,
    x_telegram_init_data: Optional[str] = Header(None)
):
    """Отправка ответа пользователя"""
    try:
        user_id = get_user_id_from_header(x_telegram_init_data)
        return game_service.submit_answer(answer, user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.get("/user/balance")
async def get_user_balance(x_telegram_init_data: Optional[str] = Header(None)):
    """Получение текущего баланса пользователя"""
    try:
        user_id = get_user_id_from_header(x_telegram_init_data)
        return {"balance": game_service.get_user_balance(user_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.post("/user/balance")
async def update_user_balance(
    new_balance: int,
    x_telegram_init_data: Optional[str] = Header(None)
):
    """Обновление баланса пользователя"""
    try:
        user_id = get_user_id_from_header(x_telegram_init_data)
        updated_balance = game_service.update_user_balance(user_id, new_balance)
        return {"balance": updated_balance}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.get("/user/stats")
async def get_user_statistics(x_telegram_init_data: Optional[str] = Header(None)):
    """Получение статистики игр пользователя"""
    try:
        user_id = get_user_id_from_header(x_telegram_init_data)
        return game_service.get_game_statistics(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.get("/user/info")
async def get_user_info(x_telegram_init_data: Optional[str] = Header(None)):
    """Получение информации о пользователе из Telegram"""
    try:
        if x_telegram_init_data:
            validated_data = telegram_auth.validate_init_data(x_telegram_init_data)
            if validated_data and 'user' in validated_data:
                return {"user": validated_data['user']}
        return {"user": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 