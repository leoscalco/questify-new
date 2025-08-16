import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import useQuestStore, { Quest } from '../store/questStore';
import QuestModal from './QuestModal';
import StyledButton from './StyledButton';

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

const QuestInfo = styled.View`
  flex: 1;
`;

const QuestActions = styled.View`
  flex-direction: row;
  align-items: center;
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

const QuestItem = ({
  quest,
  onEdit,
  onDelete,
  onStart,
}: {
  quest: Quest;
  onEdit: () => void;
  onDelete: () => void;
  onStart: () => void;
}) => (
  <QuestItemContainer>
    <QuestInfo>
      <QuestTitle>{quest.title}</QuestTitle>
      <QuestProgress>
        {quest.completedPomodoros}/{quest.totalPomodoros}
      </QuestProgress>
    </QuestInfo>
    <QuestActions>
      <StyledButton title="Start" onPress={onStart} />
      <StyledButton title="Edit" onPress={onEdit} />
      <StyledButton title="Delete" onPress={onDelete} />
    </QuestActions>
  </QuestItemContainer>
);

const QuestLog = () => {
  const navigation = useNavigation();
  const quests = useQuestStore((state) => state.quests);
  const addQuest = useQuestStore((state) => state.addQuest);
  const editQuest = useQuestStore((state) => state.editQuest);
  const deleteQuest = useQuestStore((state) => state.deleteQuest);
  const setActiveQuest = useQuestStore((state) => state.setActiveQuest);
  const [modalVisible, setModalVisible] = useState(false);
  const [questToEdit, setQuestToEdit] = useState<Quest | null>(null);

  const handleOpenModal = (quest?: Quest) => {
    setQuestToEdit(quest || null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setQuestToEdit(null);
    setModalVisible(false);
  };

  const handleSaveQuest = (title: string, totalPomodoros: number) => {
    if (questToEdit) {
      editQuest({ ...questToEdit, title, totalPomodoros });
    } else {
      addQuest({ title, totalPomodoros });
    }
    handleCloseModal();
  };

  const handleDeleteQuest = (id: string) => {
    deleteQuest(id);
  };

  const handleStartBattle = (quest: Quest) => {
    setActiveQuest(quest.id);
    navigation.navigate('FocusBattle', { quest });
  };

  return (
    <QuestLogContainer>
      <Title>Quest Log</Title>
      <FlatList
        data={quests}
        renderItem={({ item }) => (
          <QuestItem
            quest={item}
            onEdit={() => handleOpenModal(item)}
            onDelete={() => handleDeleteQuest(item.id)}
            onStart={() => handleStartBattle(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <StyledButton title="Add Quest" onPress={() => handleOpenModal()} />
      <QuestModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSaveQuest}
        questToEdit={questToEdit}
      />
    </QuestLogContainer>
  );
};

export default QuestLog;