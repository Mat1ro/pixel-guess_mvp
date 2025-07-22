import React from "react";

interface HomePageProps {
  balance: number;
  onStartGame: () => void;
  userName?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  balance,
  onStartGame,
  userName,
}) => {
  return (
    <div className="home-page">
      <h1>Pixel Guess</h1>
      <p>Угадай направление движения цены за 3 секунды!</p>

      <div className="balance-section">
        {userName && <p className="welcome-message">Привет, {userName}! 👋</p>}
        <h2>Ваш баланс:</h2>
        <div className="balance-value">{balance} фишек</div>
      </div>

      <div className="game-info">
        <h3>Правила игры:</h3>
        <ul>
          <li>Выберите размер ставки</li>
          <li>У вас есть 3 секунды, чтобы угадать направление</li>
          <li>Если угадали - удваиваете ставку</li>
          <li>Если нет - теряете ставку</li>
        </ul>
      </div>

      <button className="start-game-btn" onClick={onStartGame}>
        Начать игру
      </button>
    </div>
  );
};

export default HomePage;
