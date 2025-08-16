import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import QuestLog from '../components/QuestLog';
import useQuestStore from '../store/questStore';

const QuestsContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
`;

function QuestsScreen() {
  const addQuest = useQuestStore((state) => state.addQuest);
  const quests = useQuestStore((state) => state.quests);

  useEffect(() => {
    if (quests.length === 0) {
      addQuest({ title: 'Write report', duration: 100 });
      addQuest({ title: 'Study', duration: 100 });
      addQuest({ title: 'Walk the dog', duration: 50 });
    }
  }, []);

  return (
    <QuestsContainer>
      <QuestLog />
    </QuestsContainer>
  );
}

export default QuestsScreen;
