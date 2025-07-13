import random
import time
import uuid
from typing import Dict, List
from ..models.game import GameRound, User, GameSession, Direction, NewGameResponse, AnswerRequest, AnswerResponse

class GameService:
    def __init__(self):
        self.current_user = User(
            id="default_user",
            balance=1000,
            gamesPlayed=0,
            gamesWon=0,
            totalWinnings=0
        )
        self.active_rounds: Dict[str, GameRound] = {}
        self.active_sessions: Dict[str, GameSession] = {}
    
    def generate_realistic_chart(self, length: int = 25) -> List[float]:
        """Генерирует реалистичный график цены с случайными колебаниями"""
        data = []
        base_price = random.uniform(1800, 4200)  # Начальная цена ETH
        
        for i in range(length):
            # Случайное изменение цены от -3% до +3%
            change_percent = random.uniform(-0.03, 0.03)
            base_price *= (1 + change_percent)
            
            # Добавляем немного шума для реалистичности
            noise = random.uniform(-10, 10)
            final_price = base_price + noise
            
            # Убеждаемся, что цена не становится отрицательной
            final_price = max(final_price, 100)
            
            data.append(round(final_price, 2))
        
        return data
    
    def get_random_direction(self) -> Direction:
        """Возвращает случайное направление движения цены (50/50)"""
        return random.choice([Direction.UP, Direction.DOWN])
    
    def create_new_game(self) -> NewGameResponse:
        """Создает новый игровой раунд с рандомным результатом"""
        round_id = str(uuid.uuid4())
        
        # Генерируем график для отображения
        chart_data = self.generate_realistic_chart(25)
        
        # Определяем правильный ответ рандомно (50/50)
        correct_answer = self.get_random_direction()
        
        # Создаем фиктивные скрытые данные (они не используются для логики)
        hidden_data = self.generate_realistic_chart(10)
        
        game_round = GameRound(
            id=round_id,
            chartData=chart_data,
            hiddenData=hidden_data,  # Не используется в новой логике
            correctAnswer=correct_answer,
            timestamp=time.time(),
            pair="ETH-USDT"
        )
        
        self.active_rounds[round_id] = game_round
        
        return NewGameResponse(
            roundId=round_id,
            chartData=chart_data,
            pair=game_round.pair,
            timestamp=game_round.timestamp
        )
    
    def submit_answer(self, answer: AnswerRequest) -> AnswerResponse:
        """Обрабатывает ответ пользователя"""
        if answer.roundId not in self.active_rounds:
            raise ValueError("Раунд не найден")
        
        game_round = self.active_rounds[answer.roundId]
        is_correct = answer.userAnswer == game_round.correctAnswer
        
        # Генерация случайного коэффициента
        coefficient = random.uniform(1.5, 3.0)
        
        # Расчет выплаты
        if is_correct:
            payout = int(answer.bet * coefficient)
            self.current_user.balance += payout
            self.current_user.gamesWon += 1
            self.current_user.totalWinnings += payout
        else:
            payout = -answer.bet
            self.current_user.balance -= answer.bet
        
        self.current_user.gamesPlayed += 1
        
        # Создание сессии
        session_id = str(uuid.uuid4())
        session = GameSession(
            sessionId=session_id,
            userId=self.current_user.id,
            roundId=answer.roundId,
            bet=answer.bet,
            userAnswer=answer.userAnswer,
            responseTime=answer.responseTime,
            isCorrect=is_correct,
            payout=payout,
            timestamp=time.time()
        )
        
        self.active_sessions[session_id] = session
        
        # Удаляем завершенный раунд из памяти
        del self.active_rounds[answer.roundId]
        
        return AnswerResponse(
            isCorrect=is_correct,
            correctAnswer=game_round.correctAnswer,
            payout=payout,
            newBalance=self.current_user.balance,
            coefficient=coefficient
        )
    
    def get_user_balance(self) -> int:
        """Возвращает текущий баланс пользователя"""
        return self.current_user.balance
    
    def update_user_balance(self, new_balance: int) -> int:
        """Обновляет баланс пользователя"""
        self.current_user.balance = new_balance
        return self.current_user.balance
    
    def get_game_statistics(self) -> dict:
        """Возвращает статистику игр пользователя"""
        win_rate = 0
        if self.current_user.gamesPlayed > 0:
            win_rate = round((self.current_user.gamesWon / self.current_user.gamesPlayed) * 100, 1)
        
        return {
            "gamesPlayed": self.current_user.gamesPlayed,
            "gamesWon": self.current_user.gamesWon,
            "winRate": win_rate,
            "totalWinnings": self.current_user.totalWinnings
        }

# Глобальный экземпляр сервиса
game_service = GameService() 