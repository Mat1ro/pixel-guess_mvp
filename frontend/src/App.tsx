import React, { useState, useEffect } from "react";
import { GameRound, Direction, AnswerResponse, BetAmount } from "./types/game";
import { gameApi } from "./services/api";
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

  // Загружаем баланс при старте
  useEffect(() => {
    loadUserBalance();
  }, []);

  const loadUserBalance = async () => {
    try {
      const balance = await gameApi.getUserBalance();
      setUserBalance(balance);
    } catch (err) {
      console.error("Ошибка загрузки баланса:", err);
    }
  };

  const handleStartGame = () => {
    setError(null);
    setGameState("bet-selection");
  };

  const handleBetSelected = async (bet: BetAmount) => {
    if (bet > userBalance) {
      setError("Недостаточно фишек");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedBet(bet);

    try {
      const newRound = await gameApi.getNewGame();
      setCurrentRound(newRound);
      setGameState("game");
    } catch (err) {
      console.error("Ошибка создания игры:", err);
      setError("Ошибка создания игры");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: Direction, responseTime: number) => {
    if (!currentRound) return;

    setLoading(true);
    setError(null);

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
    } catch (err) {
      console.error("Ошибка отправки ответа:", err);
      setError("Ошибка отправки ответа");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setGameState("bet-selection");
    setLastResult(null);
    setCurrentRound(null);
  };

  const handleGoHome = () => {
    setGameState("home");
    setLastResult(null);
    setCurrentRound(null);
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
        return <HomePage balance={userBalance} onStartGame={handleStartGame} />;

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
