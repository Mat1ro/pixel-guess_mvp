import React from "react";
import { AnswerResponse } from "../types/game";

interface ResultPageProps {
  result: AnswerResponse;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  result,
  onPlayAgain,
  onGoHome,
}) => {
  return (
    <div className="result-page">
      <div className="result-header">
        <h2>Результат</h2>
      </div>

      <div className="result-content">
        <div
          className={`result-status ${
            result.isCorrect ? "correct" : "incorrect"
          }`}
        >
          {result.isCorrect ? "✓ Правильно!" : "✗ Неправильно"}
        </div>

        <div className="correct-answer">
          <p>
            Правильный ответ:{" "}
            <span className="answer">{result.correctAnswer}</span>
          </p>
        </div>

        <div className="payout-info">
          <div className="coefficient">
            Коэффициент: {result.coefficient.toFixed(2)}x
          </div>
          <div
            className={`payout ${result.payout >= 0 ? "positive" : "negative"}`}
          >
            {result.payout >= 0 ? "+" : ""}
            {result.payout} фишек
          </div>
        </div>

        <div className="balance-info">
          <p>
            Новый баланс:{" "}
            <span className="balance">{result.newBalance} фишек</span>
          </p>
        </div>
      </div>

      <div className="result-actions">
        <button className="play-again-btn" onClick={onPlayAgain}>
          Играть еще
        </button>
        <button className="home-btn" onClick={onGoHome}>
          На главную
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
