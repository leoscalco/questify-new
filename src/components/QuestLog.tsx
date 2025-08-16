import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components/native';
import useQuestStore, { Quest } from '../store/questStore';
import QuestModal from './QuestModal';

const QuestLogContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.spacing.medium}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  text-align: center;
`;

const QuestItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium}px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.small}px;
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

const QuestTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const QuestProgress = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const QuestItem = ({ quest }: { quest: Quest }) => (
  <QuestItemContainer>
    <QuestTitle>{quest.title}</QuestTitle>
    <QuestProgress>
      {quest.completedPomodoros}/{quest.totalPomodoros}
    </QuestProgress>
  </QuestItemContainer>
);

const QuestLog = () => {
  const quests = useQuestStore((state) => state.quests);
  const addQuest = useQuestStore((state) => state.addQuest);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddQuest = (title: string, totalPomodoros: number) => {
    addQuest({ title, totalPomodoros });
  };

  return (
    <QuestLogContainer>
      <Title>Quest Log</Title>
      <FlatList
        data={quests}
        renderItem={({ item }) => <QuestItem quest={item} />}
        keyExtractor={(item) => item.id}
      />
      <Button title="Add Quest" onPress={() => setModalVisible(true)} />
      <QuestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddQuest}
      />
    </QuestLogContainer>
  );
};

export default QuestLog;