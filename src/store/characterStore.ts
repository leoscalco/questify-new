import { create } from 'zustand';

interface CharacterStats {
  strength: number;
  agility: number;
  intelligence: number;
  luck: number;
  dexterity: number;
  vitality: number;
}

interface CharacterState {
  name: string;
  gender: string;
  classType: string;
  age: number;
  level: number;
  xp: number;
  gold: number;
  stats: CharacterStats;
  gainXp: (amount: number) => void;
  gainGold: (amount: number) => void;
  spendGold: (amount: number) => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
  name: 'Ordinary Hero',
  gender: 'Male',
  classType: 'Warrior',
  age: 25,
  level: 1,
  xp: 0,
  gold: 0,
  stats: {
    strength: 10,
    agility: 5,
    intelligence: 3,
    luck: 4,
    dexterity: 6,
    vitality: 12,
  },
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
