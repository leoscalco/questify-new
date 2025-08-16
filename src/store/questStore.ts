import { create } from 'zustand';
import useTimerStore from './timerStore';
import useCharacterStore from './characterStore';

export interface Quest {
  id: string;
  title: string;
  completedPomodoros: number;
  totalPomodoros: number;
  duration: number; // in minutes
  goldReward?: number;
}

interface QuestState {
  quests: Quest[];
  finishedQuests: Quest[];
  activeQuestId: string | null;
  nextId: number;
  addQuest: (
    quest: Omit<Quest, 'id' | 'completedPomodoros' | 'totalPomodoros'>
  ) => void;
  editQuest: (quest: Quest) => void;
  deleteQuest: (id: string) => void;
  incrementPomodoro: (id: string) => void;
  setActiveQuest: (id: string | null) => void;
  recalculatePomodoros: (workDuration: number) => void;
  markAsFinished: (id: string) => void;
}

const useQuestStore = create<QuestState>((set) => ({
  quests: [],
  finishedQuests: [],
  activeQuestId: null,
  nextId: 1,
  addQuest: (quest) =>
    set((state) => {
      const { workDuration } = useTimerStore.getState();
      return {
        quests: [
          ...state.quests,
          {
            ...quest,
            id: state.nextId.toString(),
            completedPomodoros: 0,
            totalPomodoros: Math.ceil(quest.duration / workDuration),
          },
        ],
        nextId: state.nextId + 1,
      };
    }),
  editQuest: (quest) =>
    set((state) => ({
      quests: state.quests.map((q) => (q.id === quest.id ? quest : q)),
    })),
  deleteQuest: (id) =>
    set((state) => ({
      quests: state.quests.filter((q) => q.id !== id),
    })),
  incrementPomodoro: (id) =>
    set((state) => ({
      quests: state.quests.map((q) =>
        q.id === id
          ? { ...q, completedPomodoros: q.completedPomodoros + 1 }
          : q
      ),
    })),
  setActiveQuest: (id) => set({ activeQuestId: id }),
  recalculatePomodoros: (workDuration) =>
    set((state) => ({
      quests: state.quests.map((quest) => ({
        ...quest,
        totalPomodoros: Math.ceil(quest.duration / workDuration),
      })),
    })),
  markAsFinished: (id) =>
    set((state) => {
      const questToFinish = state.quests.find((q) => q.id === id);
      if (!questToFinish) return {};

      const goldReward = questToFinish.duration * 2;
      useCharacterStore.getState().gainGold(goldReward);

      const finishedQuest = {
        ...questToFinish,
        completedPomodoros: questToFinish.totalPomodoros,
        goldReward,
      };

      return {
        quests: state.quests.filter((q) => q.id !== id),
        finishedQuests: [finishedQuest, ...state.finishedQuests],
      };
    }),
}));

export default useQuestStore;