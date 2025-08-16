import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import useQuestStore, { Quest } from '../store/questStore';
import useTimerStore from '../store/timerStore';
import QuestModal from './QuestModal';
import StyledButton from './StyledButton';

const QuestLogContainer = styled.View`
  flex: 1;
`;

const ListContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
  padding: ${(props) => props.theme.spacing.medium}px;
`;

const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyListText = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  text-align: center;
`;

const QuestItemContainer = styled.View<{ finished?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium}px;
  background-color: ${(props) =>
    props.finished
      ? props.theme.colors.lightGray
      : props.theme.colors.background};
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

const IconButton = styled.TouchableOpacity`
  padding: 8px;
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
  onFinish,
  finished,
}: {
  quest: Quest;
  onEdit: () => void;
  onDelete: () => void;
  onStart: () => void;
  onFinish: () => void;
  finished?: boolean;
}) => (
  <QuestItemContainer finished={finished}>
    <QuestInfo>
      <QuestTitle>{quest.title}</QuestTitle>
      {!finished && (
        <QuestProgress>
          {quest.completedPomodoros}/{quest.totalPomodoros}
        </QuestProgress>
      )}
      {finished && quest.goldReward && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/coin-icon.png')}
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
          <QuestProgress>{quest.goldReward}</QuestProgress>
        </View>
      )}
    </QuestInfo>
    {!finished && (
      <QuestActions>
        <IconButton onPress={onStart}>
          <Feather name="play" size={24} color="green" />
        </IconButton>
        <IconButton onPress={onEdit}>
          <Feather name="edit" size={24} color="blue" />
        </IconButton>
        <IconButton onPress={onDelete}>
          <Feather name="trash-2" size={24} color="red" />
        </IconButton>
        <IconButton onPress={onFinish}>
          <Feather name="check-circle" size={24} color="green" />
        </IconButton>
      </QuestActions>
    )}
  </QuestItemContainer>
);

const QuestLog = () => {
  const navigation = useNavigation();
  const { quests, finishedQuests } = useQuestStore();
  const addQuest = useQuestStore((state) => state.addQuest);
  const editQuest = useQuestStore((state) => state.editQuest);
  const deleteQuest = useQuestStore((state) => state.deleteQuest);
  const setActiveQuest = useQuestStore((state) => state.setActiveQuest);
  const markAsFinished = useQuestStore((state) => state.markAsFinished);
  const { workDuration, resetTime } = useTimerStore();
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

  const handleSaveQuest = (title: string, duration: number) => {
    if (questToEdit) {
      editQuest({
        ...questToEdit,
        title,
        duration,
        totalPomodoros: Math.ceil(duration / workDuration),
      });
    } else {
      addQuest({ title, duration });
    }
    handleCloseModal();
  };

  const handleDeleteQuest = (id: string) => {
    deleteQuest(id);
  };

  const handleStartBattle = (quest: Quest) => {
    setActiveQuest(quest.id);
    resetTime();
    navigation.navigate('FocusBattle', { quest });
  };

  return (
    <QuestLogContainer>
      <ScrollView>
        <View style={{ marginBottom: 16 }}>
          <StyledButton title="Add Quest" onPress={() => handleOpenModal()} />
        </View>
        <Title>Active Quests</Title>
        <ListContainer>
          <FlatList
            data={quests}
            renderItem={({ item }) => (
              <QuestItem
                quest={item}
                onEdit={() => handleOpenModal(item)}
                onDelete={() => handleDeleteQuest(item.id)}
                onStart={() => handleStartBattle(item)}
                onFinish={() => markAsFinished(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </ListContainer>
        <Title>Finished Quests</Title>
        <ListContainer>
          <FlatList
            data={finishedQuests}
            renderItem={({ item }) => (
              <QuestItem
                quest={item}
                finished
                onEdit={() => {}}
                onDelete={() => {}}
                onStart={() => {}}
                onFinish={() => {}}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <EmptyListContainer>
                <EmptyListText>
                  Hurry up, start battling to get rewards
                </EmptyListText>
              </EmptyListContainer>
            }
          />
        </ListContainer>
      </ScrollView>
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