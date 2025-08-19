import { create } from 'zustand';

interface SetupState {
  isSetupComplete: boolean;
  completeSetup: () => void;
}

const useSetupStore = create<SetupState>((set) => ({
  isSetupComplete: false,
  completeSetup: () => set({ isSetupComplete: true }),
}));

export default useSetupStore;
