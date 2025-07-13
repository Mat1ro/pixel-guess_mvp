from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Direction(str, Enum):
    UP = "UP"
    DOWN = "DOWN"

class GameRound(BaseModel):
    id: str
    chartData: List[float]
    hiddenData: List[float]
    correctAnswer: Direction
    timestamp: float
    pair: str = "ETH-USDT"

class User(BaseModel):
    id: str
    balance: int
    gamesPlayed: int
    gamesWon: int
    totalWinnings: int

class GameSession(BaseModel):
    sessionId: str
    userId: str
    roundId: str
    bet: int
    userAnswer: Optional[Direction] = None
    responseTime: Optional[float] = None
    isCorrect: Optional[bool] = None
    payout: Optional[int] = None
    timestamp: float

class NewGameResponse(BaseModel):
    roundId: str
    chartData: List[float]
    pair: str
    timestamp: float

class AnswerRequest(BaseModel):
    roundId: str
    userAnswer: Direction
    bet: int
    responseTime: float

class AnswerResponse(BaseModel):
    isCorrect: bool
    correctAnswer: Direction
    payout: int
    newBalance: int
    coefficient: float 