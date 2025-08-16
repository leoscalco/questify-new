import { create } from 'zustand';

interface TimerState {
  time: number;
  isActive: boolean;
  isWorkSession: boolean;
  workDuration: number;
  breakDuration: number;
  startTime: () => void;
  pauseTime: () => void;
  resetTime: () => void;
  toggleSession: () => void;
  decrementTime: () => void;
  setDurations: (work: number, breakTime: number) => void;
}

const useTimerStore = create<TimerState>((set, get) => ({
  time: 25 * 60,
  isActive: false,
  isWorkSession: true,
  workDuration: 25,
  breakDuration: 5,
  startTime: () => set({ isActive: true }),
  pauseTime: () => set({ isActive: false }),
  resetTime: () =>
    set((state) => ({
      isActive: false,
      isWorkSession: true,
      time: state.workDuration * 60,
    })),
  toggleSession: () =>
    set((state) => ({
      isWorkSession: !state.isWorkSession,
      time: !state.isWorkSession
        ? state.workDuration * 60
        : state.breakDuration * 60,
    })),
  decrementTime: () => set((state) => ({ time: state.time - 1 })),
  setDurations: (work, breakTime) =>
    set({ workDuration: work, breakDuration: breakTime }),
}));

export default useTimerStore;