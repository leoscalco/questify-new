import { create } from 'zustand';

interface BlockedAppsState {
  blockedApps: string[];
  addBlockedApp: (app: string) => void;
  removeBlockedApp: (app: string) => void;
}

const useBlockedAppsStore = create<BlockedAppsState>((set) => ({
  blockedApps: [],
  addBlockedApp: (app) =>
    set((state) => ({
      blockedApps: [...state.blockedApps, app],
    })),
  removeBlockedApp: (app) =>
    set((state) => ({
      blockedApps: state.blockedApps.filter((a) => a !== app),
    })),
}));

export default useBlockedAppsStore;
