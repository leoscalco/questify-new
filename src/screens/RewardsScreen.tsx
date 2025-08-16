import React from 'react';
import styled from 'styled-components/native';
import useCharacterStore from '../store/characterStore';

const RewardsContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.large}px;
`;

const StatsContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
`;

const StatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

const StatLabel = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
`;

const StatValue = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
`;

function RewardsScreen() {
  const { level, xp, gold } = useCharacterStore();

  return (
    <RewardsContainer>
      <Title>Character</Title>
      <StatsContainer>
        <StatRow>
          <StatLabel>Level</StatLabel>
          <StatValue>{level}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>XP</StatLabel>
          <StatValue>{xp}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Gold</StatLabel>
          <StatValue>{gold}</StatValue>
        </StatRow>
      </StatsContainer>
    </RewardsContainer>
  );
}

export default RewardsScreen;