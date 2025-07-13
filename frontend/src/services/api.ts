import axios from "axios";
import { GameRound, AnswerRequest, AnswerResponse } from "../types/game";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const gameApi = {
  // Получить новый игровой раунд
  async getNewGame(): Promise<GameRound> {
    const response = await api.get<GameRound>("/game/new");
    return response.data;
  },

  // Отправить ответ пользователя
  async submitAnswer(answer: AnswerRequest): Promise<AnswerResponse> {
    const response = await api.post<AnswerResponse>("/game/answer", answer);
    return response.data;
  },

  // Получить баланс пользователя
  async getUserBalance(): Promise<number> {
    const response = await api.get<{ balance: number }>("/user/balance");
    return response.data.balance;
  },

  // Обновить баланс пользователя
  async updateUserBalance(newBalance: number): Promise<number> {
    const response = await api.post<{ balance: number }>("/user/balance", {
      new_balance: newBalance,
    });
    return response.data.balance;
  },
};

export default api;
