import axios from "axios";
import { GameRound, AnswerRequest, AnswerResponse } from "../types/game";
import { telegramService } from "./telegram";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем interceptor для автоматической отправки Telegram init data
api.interceptors.request.use((config) => {
  const initData = telegramService.getInitData();
  if (initData) {
    config.headers["X-Telegram-Init-Data"] = initData;
  }
  return config;
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

  // Получить информацию о пользователе
  async getUserInfo(): Promise<any> {
    const response = await api.get("/user/info");
    return response.data.user;
  },

  // Получить статистику игр
  async getUserStats(): Promise<any> {
    const response = await api.get("/user/stats");
    return response.data;
  },
};

export default api;
