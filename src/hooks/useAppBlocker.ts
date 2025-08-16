import { useEffect } from 'react';
import { AppState } from 'react-native';
import useTimerStore from '../store/timerStore';

const useAppBlocker = () => {
  const { isActive, isWorkSession, pauseTime } = useTimerStore();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' && isActive && isWorkSession) {
        pauseTime();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isActive, isWorkSession]);
};

export default useAppBlocker;
