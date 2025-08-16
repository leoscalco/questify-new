import { create } from 'zustand';

interface CharacterState {
  level: number;
  xp: number;
  gold: number;
  gainXp: (amount: number) => void;
  gainGold: (amount: number) => void;
  spendGold: (amount: number) => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
  level: 1,
  xp: 0,
  gold: 0,
  gainXp: (amount) =>
    set((state) => {
      const newXp = state.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      return { xp: newXp, level: newLevel };
    }),
  gainGold: (amount) =>
    set((state) => ({
      gold: state.gold + amount,
    })),
  spendGold: (amount) =>
    set((state) => ({
      gold: state.gold - amount,
    })),
}));

export default useCharacterStore;
