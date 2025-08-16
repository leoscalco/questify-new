import React, { useEffect } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import useTimerStore from '../store/timerStore';
import useQuestStore from '../store/questStore';
import useCharacterStore from '../store/characterStore';
import StyledButton from './StyledButton';

const FocusBattleContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.spacing.medium}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
  align-items: center;
`;

const MonsterImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const TimerText = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const FocusBattle = () => {
  const {
    time,
    isActive,
    isWorkSession,
    startTime,
    pauseTime,
    resetTime,
    toggleSession,
    decrementTime,
  } = useTimerStore();
  const { activeQuestId, incrementPomodoro } = useQuestStore();
  const { gainXp, gainGold } = useCharacterStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        decrementTime();
      }, 1000);
    } else if (isActive && time === 0) {
      if (isWorkSession) {
        if (activeQuestId) {
          incrementPomodoro(activeQuestId);
        }
        gainXp(10);
        gainGold(5);
      }
      toggleSession();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <FocusBattleContainer>
      <Title>{isWorkSession ? 'Focus Battle' : 'Break Time'}</Title>
      <MonsterImage source={require('../assets/images/monster1.png')} />
      <TimerText>{formatTime(time)}</TimerText>
      <ControlsContainer>
        {!isActive ? (
          <StyledButton title="Start" onPress={startTime} />
        ) : (
          <StyledButton title="Pause" onPress={pauseTime} />
        )}
      </ControlsContainer>
    </FocusBattleContainer>
  );
};

export default FocusBattle;