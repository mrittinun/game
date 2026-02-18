import { create } from "zustand";
import { BattleState } from "@/game/config/constants";

// Player stats interface
interface PlayerStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  level: number;
  exp: number;
}

// Game settings interface
interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  difficulty: "easy" | "normal" | "hard";
}

// Game store interface
interface GameStore {
  // Player state
  player: PlayerStats;
  
  // Battle state
  battleState: BattleState;
  currentTurn: "player" | "enemy";
  turnCount: number;
  
  // Settings
  settings: GameSettings;
  
  // Actions
  setPlayerStats: (stats: Partial<PlayerStats>) => void;
  setBattleState: (state: BattleState) => void;
  setCurrentTurn: (turn: "player" | "enemy") => void;
  incrementTurn: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetBattle: () => void;
}

// Initial player stats
const initialPlayerStats: PlayerStats = {
  hp: 1000,
  maxHp: 1000,
  mp: 100,
  maxMp: 100,
  attack: 100,
  defense: 50,
  level: 1,
  exp: 0,
};

// Initial settings
const initialSettings: GameSettings = {
  musicVolume: 0.7,
  sfxVolume: 0.8,
  difficulty: "normal",
};

// Create game store
export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  player: initialPlayerStats,
  battleState: BattleState.IDLE,
  currentTurn: "player",
  turnCount: 0,
  settings: initialSettings,
  
  // Actions
  setPlayerStats: (stats) =>
    set((state) => ({
      player: { ...state.player, ...stats },
    })),
  
  setBattleState: (battleState) => set({ battleState }),
  
  setCurrentTurn: (currentTurn) => set({ currentTurn }),
  
  incrementTurn: () =>
    set((state) => ({
      turnCount: state.turnCount + 1,
      currentTurn: state.currentTurn === "player" ? "enemy" : "player",
    })),
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  
  resetBattle: () =>
    set({
      battleState: BattleState.IDLE,
      currentTurn: "player",
      turnCount: 0,
    }),
}));
