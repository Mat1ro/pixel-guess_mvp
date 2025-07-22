import React, { useState, useEffect } from "react";
import { GameRound, Direction, AnswerResponse, BetAmount } from "./types/game";
import { gameApi } from "./services/api";
import { telegramService } from "./services/telegram";
import HomePage from "./components/HomePage";
import BetSelection from "./components/BetSelection";
import GamePage from "./components/GamePage";
import ResultPage from "./components/ResultPage";
import "./App.css";

type GameState = "home" | "bet-selection" | "game" | "result";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("home");
  const [userBalance, setUserBalance] = useState(1000);
  const [selectedBet, setSelectedBet] = useState<BetAmount>(10);
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [lastResult, setLastResult] = useState<AnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telegramUser, setTelegramUser] = useState<any>(null);

  // Инициализируем Telegram Web App при старте
  useEffect(() => {
    telegramService.init();
    const userData = telegramService.getUserData();
    setTelegramUser(userData);

    // Загружаем баланс с учетом Telegram ID
    if (userData) {
      loadUserBalance(userData.id);
    }
  }, []);

  // Настраиваем кнопку "Назад" в зависимости от состояния
  useEffect(() => {
    if (gameState === "home") {
      telegramService.hideBackButton();
    } else {
      telegramService.showBackButton(() => {
        if (gameState === "result" || gameState === "bet-selection") {
          setGameState("home");
        }
      });
    }
  }, [gameState]);

  const loadUserBalance = async (userId?: number) => {
    try {
      // В будущем здесь будет передаваться userId для загрузки баланса конкретного пользователя
      const balance = await gameApi.getUserBalance();
      setUserBalance(balance);
    } catch (err) {
      console.error("Ошибка загрузки баланса:", err);
    }
  };

  const handleStartGame = () => {
    setError(null);
    setGameState("bet-selection");
    telegramService.hapticFeedback("impact", "light");
  };

  const handleBetSelected = async (bet: BetAmount) => {
    if (bet > userBalance) {
      setError("Недостаточно фишек");
      telegramService.hapticFeedback("notification", "error");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedBet(bet);
    telegramService.hapticFeedback("impact", "medium");

    try {
      const newRound = await gameApi.getNewGame();
      setCurrentRound(newRound);
      setGameState("game");
    } catch (err) {
      console.error("Ошибка создания игры:", err);
      setError("Ошибка создания игры");
      telegramService.hapticFeedback("notification", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: Direction, responseTime: number) => {
    if (!currentRound) return;

    setLoading(true);
    setError(null);
    telegramService.hapticFeedback("impact", "heavy");

    try {
      const result = await gameApi.submitAnswer({
        roundId: currentRound.roundId,
        userAnswer: answer,
        bet: selectedBet,
        responseTime,
      });

      setLastResult(result);
      setUserBalance(result.newBalance);
      setGameState("result");

      // Вибрация в зависимости от результата
      if (result.isCorrect) {
        telegramService.hapticFeedback("notification", "success");
      } else {
        telegramService.hapticFeedback("notification", "error");
      }
    } catch (err) {
      console.error("Ошибка отправки ответа:", err);
      setError("Ошибка отправки ответа");
      telegramService.hapticFeedback("notification", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setGameState("bet-selection");
    setLastResult(null);
    setCurrentRound(null);
    telegramService.hapticFeedback("impact", "light");
  };

  const handleGoHome = () => {
    setGameState("home");
    setLastResult(null);
    setCurrentRound(null);
    telegramService.hapticFeedback("impact", "light");
  };

  const renderCurrentState = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <button onClick={handleGoHome}>На главную</button>
        </div>
      );
    }

    switch (gameState) {
      case "home":
        return (
          <HomePage
            balance={userBalance}
            onStartGame={handleStartGame}
            userName={telegramUser?.first_name}
          />
        );

      case "bet-selection":
        return (
          <BetSelection
            balance={userBalance}
            onBetSelected={handleBetSelected}
          />
        );

      case "game":
        return currentRound ? (
          <GamePage
            gameRound={currentRound}
            bet={selectedBet}
            onAnswer={handleAnswer}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        ) : null;

      case "result":
        return lastResult ? (
          <ResultPage
            result={lastResult}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="container">{renderCurrentState()}</div>
    </div>
  );
};

export default App;
