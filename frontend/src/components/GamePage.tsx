import React, { useState, useEffect } from "react";
import { GameRound, Direction } from "../types/game";
import Chart from "./Chart";

interface GamePageProps {
  gameRound: GameRound;
  bet: number;
  onAnswer: (answer: Direction, responseTime: number) => void;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const GamePage: React.FC<GamePageProps> = ({
  gameRound,
  bet,
  onAnswer,
  onPlayAgain,
  onGoHome,
}) => {
  const [timer, setTimer] = useState(3);
  const [startTime] = useState(Date.now());
  const [answered, setAnswered] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    if (timer > 0 && !answered) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !answered) {
      setTimeExpired(true);
    }
  }, [timer, answered]);

  const handleAnswer = (direction: Direction) => {
    if (answered || timer <= 0) return;

    setAnswered(true);
    const responseTime = Date.now() - startTime;
    onAnswer(direction, responseTime);
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="pair-info">
          <span>{gameRound.pair}</span>
        </div>
        <div className="timer">{timer > 0 ? `${timer}s` : "Время вышло!"}</div>
        <div className="bet-info">Ставка: {bet} фишек</div>
      </div>

      <div className="chart-section">
        <Chart data={gameRound.chartData} isBlurred={true} />
      </div>

      <div className="controls">
        {timeExpired ? (
          <div className="timeout-controls">
            <p className="timeout-message">Время вышло! Вы не сделали выбор.</p>
            <div className="timeout-buttons">
              <button className="play-again-btn" onClick={onPlayAgain}>
                Играть снова
              </button>
              <button className="home-btn" onClick={onGoHome}>
                Главное меню
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="direction-buttons">
              <button
                className="direction-btn up-btn"
                onClick={() => handleAnswer(Direction.UP)}
                disabled={answered || timer <= 0}
              >
                <span className="arrow">↑</span>
                <span className="label">UP</span>
              </button>
              <button
                className="direction-btn down-btn"
                onClick={() => handleAnswer(Direction.DOWN)}
                disabled={answered || timer <= 0}
              >
                <span className="arrow">↓</span>
                <span className="label">DOWN</span>
              </button>
            </div>

            <div className="game-instructions">
              <p>Куда пойдет цена?</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GamePage;
