import React from 'react';
import styled from 'styled-components/native';
import FocusBattle from '../components/FocusBattle';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Quest } from '../store/questStore';

const FocusBattleScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.large}px;
`;

type FocusBattleScreenRouteProp = RouteProp<
  { params: { quest: Quest; monsterImage: any } },
  'params'
>;

type FocusBattleScreenNavigationProp = StackNavigationProp<
  Record<string, { quest: Quest; monsterImage: any }>,
  'FocusBattle'
>;

interface FocusBattleScreenProps {
  route: FocusBattleScreenRouteProp;
  navigation: FocusBattleScreenNavigationProp;
}

const FocusBattleScreen: React.FC<FocusBattleScreenProps> = ({ route }) => {
  const { quest, monsterImage } = route.params;

  return (
    <FocusBattleScreenContainer>
      <FocusBattle monsterImage={monsterImage} />
    </FocusBattleScreenContainer>
  );
};

export default FocusBattleScreen;