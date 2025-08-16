import { useEffect } from 'react';
import { AppState, Alert } from 'react-native';
import useTimerStore from '../store/timerStore';
import useBlockedAppsStore from '../store/blockedAppsStore';

const useAppBlocker = () => {
  const { isActive, isWorkSession } = useTimerStore();
  const { blockedApps } = useBlockedAppsStore();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' && isActive && isWorkSession) {
        // Here we would get the foreground app and check if it's in the blocked list
        // For now, we'll just show a generic alert
        Alert.alert(
          'Distraction Detected!',
          'You opened a blocked app during a focus session.'
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isActive, isWorkSession, blockedApps]);
};

export default useAppBlocker;
