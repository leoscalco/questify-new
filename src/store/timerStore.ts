import { create } from 'zustand';

interface TimerState {
  time: number;
  isActive: boolean;
  isPaused: boolean;
  startTime: () => void;
  pauseTime: () => void;
  resetTime: () => void;
  setTime: (time: number) => void;
}

const useTimerStore = create<TimerState>((set) => ({
  time: 25 * 60,
  isActive: false,
  isPaused: false,
  startTime: () => set({ isActive: true, isPaused: false }),
  pauseTime: () => set({ isPaused: true }),
  resetTime: () => set({ isActive: false, isPaused: false, time: 25 * 60 }),
  setTime: (time) => set({ time }),
}));

export default useTimerStore;