import React, { useState } from "react";
import { BetAmount } from "../types/game";

interface BetSelectionProps {
  balance: number;
  onBetSelected: (bet: BetAmount) => void;
}

const BetSelection: React.FC<BetSelectionProps> = ({
  balance,
  onBetSelected,
}) => {
  const [selectedBet, setSelectedBet] = useState<BetAmount>(10);

  const betOptions: BetAmount[] = [10, 50, 100];

  const handleBetSelect = (bet: BetAmount) => {
    setSelectedBet(bet);
  };

  const handleReady = () => {
    onBetSelected(selectedBet);
  };

  return (
    <div className="bet-selection">
      <div className="header">
        <h2>Выберите размер ставки</h2>
        <div className="balance">Баланс: {balance} фишек</div>
      </div>

      <div className="bet-options">
        {betOptions.map((bet) => (
          <button
            key={bet}
            className={`bet-btn ${selectedBet === bet ? "selected" : ""} ${
              bet > balance ? "disabled" : ""
            }`}
            onClick={() => handleBetSelect(bet)}
            disabled={bet > balance}
          >
            {bet} фишек
          </button>
        ))}
      </div>

      <div className="selected-bet">
        <p>
          Выбранная ставка:{" "}
          <span className="bet-amount">{selectedBet} фишек</span>
        </p>
      </div>

      <button
        className="ready-btn"
        onClick={handleReady}
        disabled={selectedBet > balance}
      >
        Готов
      </button>
    </div>
  );
};

export default BetSelection;
