from fastapi import APIRouter, HTTPException
from ..models.game import AnswerRequest, AnswerResponse, NewGameResponse
from ..services.game_service import game_service

game_router = APIRouter()

@game_router.get("/game/new", response_model=NewGameResponse)
async def get_new_game():
    """Получение нового игрового раунда"""
    try:
        return game_service.create_new_game()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.post("/game/answer", response_model=AnswerResponse)
async def submit_answer(answer: AnswerRequest):
    """Отправка ответа пользователя"""
    try:
        return game_service.submit_answer(answer)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.get("/user/balance")
async def get_user_balance():
    """Получение текущего баланса пользователя"""
    try:
        return {"balance": game_service.get_user_balance()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.post("/user/balance")
async def update_user_balance(new_balance: int):
    """Обновление баланса пользователя"""
    try:
        updated_balance = game_service.update_user_balance(new_balance)
        return {"balance": updated_balance}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@game_router.get("/user/stats")
async def get_user_statistics():
    """Получение статистики игр пользователя"""
    try:
        return game_service.get_game_statistics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 