export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
}

export interface GameRound {
  roundId: string;
  chartData: number[];
  pair: string;
  timestamp: number;
}

export interface AnswerRequest {
  roundId: string;
  userAnswer: Direction;
  bet: number;
  responseTime: number;
}

export interface AnswerResponse {
  isCorrect: boolean;
  correctAnswer: Direction;
  payout: number;
  newBalance: number;
  coefficient: number;
}

export interface User {
  id: string;
  balance: number;
  gamesPlayed: number;
  gamesWon: number;
  totalWinnings: number;
}

export interface GameState {
  currentRound: GameRound | null;
  userBalance: number;
  selectedBet: number;
  isGameActive: boolean;
  timer: number;
  lastResult: AnswerResponse | null;
}

export type BetAmount = 10 | 50 | 100;
