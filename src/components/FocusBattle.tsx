import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import useTimerStore from '../store/timerStore';

const FocusBattleContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.spacing.medium}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
  align-items: center;
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

const FocusBattle = () => {
  const { time, isActive, isPaused, startTime, pauseTime, resetTime, setTime } =
    useTimerStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      resetTime();
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <FocusBattleContainer>
      <Title>Focus Battle</Title>
      <TimerText>{formatTime(time)}</TimerText>
      {!isActive && !isPaused ? (
        <Button title="Start" onPress={startTime} />
      ) : (
        <>
          <Button
            title={isPaused ? 'Resume' : 'Pause'}
            onPress={isPaused ? startTime : pauseTime}
          />
          <Button title="Reset" onPress={resetTime} />
        </>
      )}
    </FocusBattleContainer>
  );
};

export default FocusBattle;