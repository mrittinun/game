import { create } from "zustand";
import cardsData from "@/game/data/cards.json";

// Card interface
export interface Card {
  id: string;
  name: string;
  element: string;
  role: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  skills: string[];
}

// Store interface
interface CardStore {
  cards: Card[];
  loadCards: () => void;
  getCardById: (id: string) => Card | undefined;
  updateCardStats: (id: string, stats: Partial<Card["stats"]>) => void;
  updateCardSkills: (id: string, skills: string[]) => void;
}

// Create store
export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  
  loadCards: () => {
    set({ cards: cardsData as Card[] });
  },
  
  getCardById: (id: string) => {
    return get().cards.find(card => card.id === id);
  },
  
  updateCardStats: (id: string, stats: Partial<Card["stats"]>) => {
    set(state => ({
      cards: state.cards.map(card =>
        card.id === id
          ? { ...card, stats: { ...card.stats, ...stats } }
          : card
      ),
    }));
  },
  
  updateCardSkills: (id: string, skills: string[]) => {
    set(state => ({
      cards: state.cards.map(card =>
        card.id === id
          ? { ...card, skills }
          : card
      ),
    }));
  },
}));

// Initialize cards on module load
useCardStore.getState().loadCards();
