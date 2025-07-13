import React from "react";

interface HomePageProps {
  balance: number;
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ balance, onStartGame }) => {
  return (
    <div className="home-page">
      <div className="header">
        <h1>Pixel-Guess Trainer</h1>
        <p>Тренируйте навыки прогнозирования движения цен</p>
      </div>

      <div className="balance-section">
        <h2>Ваш баланс</h2>
        <div className="balance-value">{balance} фишек</div>
      </div>

      <div className="game-info">
        <h3>Как играть:</h3>
        <ul>
          <li>Изучите график цены</li>
          <li>Выберите размер ставки</li>
          <li>Угадайте направление движения цены</li>
          <li>У вас есть 3 секунды на решение</li>
        </ul>
      </div>

      <button className="start-game-btn" onClick={onStartGame}>
        Начать игру
      </button>
    </div>
  );
};

export default HomePage;
