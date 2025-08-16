import { useEffect } from 'react';
import styled from 'styled-components/native';
import FocusBattle from '../components/FocusBattle';
import useQuestStore from '../store/questStore';

const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.large}px;
`;

function HomeScreen() {
  return (
    <HomeScreenContainer>
      <FocusBattle />
    </HomeScreenContainer>
  );
}

export default HomeScreen;