import { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import QuestLog from '../components/QuestLog';
import FocusBattle from '../components/FocusBattle';
import useQuestStore from '../store/questStore';

const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.large}px;
`;

const Spacer = styled.View`
  height: ${(props) => props.theme.spacing.large}px;
`;

function HomeScreen() {
  const addQuest = useQuestStore((state) => state.addQuest);
  const quests = useQuestStore((state) => state.quests);

  useEffect(() => {
    if (quests.length === 0) {
      addQuest({ title: 'Write report', totalPomodoros: 4 });
      addQuest({ title: 'Study', totalPomodoros: 4 });
      addQuest({ title: 'Walk the dog', totalPomodoros: 2 });
    }
  }, []);

  return (
    <HomeScreenContainer>
      <QuestLog />
      <Spacer />
      <FocusBattle />
    </HomeScreenContainer>
  );
}

export default HomeScreen;