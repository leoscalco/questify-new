import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import useQuestStore, { Quest } from '../store/questStore';
import useTimerStore from '../store/timerStore';
import QuestModal from './QuestModal';
import StyledButton from './StyledButton';
import { monsters, bosses } from '../assets/monsters';

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
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  text-align: center;
`;

const FinishedQuestsTitle = styled(Title)`
  margin-top: 32px;
`;

const QuestItemContainer = styled.View<{ finished?: boolean; isHard?: boolean }>`
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
  overflow: hidden;
  border-width: ${(props) => (props.isHard ? '2px' : '0px')};
  border-color: ${(props) => props.theme.colors.danger};
`;

const MonsterBackground = styled.Image`
  position: absolute;
  left: -20px;
  top: -20px;
  width: 100px;
  height: 100px;
  opacity: 0.2;
  transform: rotate(-15deg);
`;

const FinishedMonsterBackground = styled(MonsterBackground)`
  left: auto;
  right: -20px;
  transform: rotate(15deg);
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

const IconImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const QuestTitle = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const QuestProgress = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const BossTag = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.danger};
  margin-top: 4px;
`;

const QuestDate = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.text};
  margin-top: 4px;
`;

const QuestItem = ({
  quest,
  onEdit,
  onDelete,
  onStart,
  onFinish,
  finished,
  index,
}: {
  quest: Quest;
  onEdit: () => void;
  onDelete: () => void;
  onStart: () => void;
  onFinish: () => void;
  finished?: boolean;
  index: number;
}) => (
  <QuestItemContainer finished={finished} isHard={quest.isHard}>
    {!finished && (
      <MonsterBackground
        source={
          quest.isHard
            ? bosses[quest.monsterImage]
            : monsters[quest.monsterImage]
        }
      />
    )}
    {finished && (
      <FinishedMonsterBackground
        source={
          quest.isHard
            ? bosses[quest.monsterImage]
            : monsters[quest.monsterImage]
        }
      />
    )}
    <QuestInfo>
      <QuestTitle>{quest.title}</QuestTitle>
      {quest.isHard && <BossTag>Boss</BossTag>}
      {!finished && (
        <QuestDate>
          Added: {new Date(quest.createdAt).toLocaleDateString()}
        </QuestDate>
      )}
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
      {finished && quest.createdAt && quest.finishedAt && (
        <QuestDate>
          Completed in{' '}
          {Math.max(
            1,
            Math.ceil(
              (new Date(quest.finishedAt).getTime() -
                new Date(quest.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          )}{' '}
          day(s)
        </QuestDate>
      )}
    </QuestInfo>
    {!finished && (
      <QuestActions>
        <IconButton onPress={onStart}>
          <IconImage source={require('../assets/images/gemini/play.png')} />
        </IconButton>
        <IconButton onPress={onEdit}>
          <IconImage source={require('../assets/images/gemini/edit.png')} />
        </IconButton>
        <IconButton onPress={onDelete}>
          <IconImage source={require('../assets/images/gemini/delete.png')} />
        </IconButton>
        <IconButton onPress={onFinish}>
          <IconImage source={require('../assets/images/gemini/finished.png')} />
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

  const handleSaveQuest = (
    title: string,
    duration: number,
    isHard: boolean
  ) => {
    if (questToEdit) {
      editQuest({
        ...questToEdit,
        title,
        duration,
        isHard,
        totalPomodoros: Math.ceil(duration / workDuration),
      });
    } else {
      addQuest({ title, duration, isHard });
    }
    handleCloseModal();
  };

  const handleDeleteQuest = (id: string) => {
    deleteQuest(id);
  };

  const handleStartBattle = (quest: Quest) => {
    setActiveQuest(quest.id);
    resetTime();
    navigation.navigate('FocusBattle', {
      quest,
      monsterImage: quest.isHard
        ? bosses[quest.monsterImage]
        : monsters[quest.monsterImage],
    });
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
            renderItem={({ item, index }) => (
              <QuestItem
                quest={item}
                onEdit={() => handleOpenModal(item)}
                onDelete={() => handleDeleteQuest(item.id)}
                onStart={() => handleStartBattle(item)}
                onFinish={() => markAsFinished(item.id)}
                index={index}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <EmptyListContainer>
                <EmptyListText>
                  Click the button on top to add quests
                </EmptyListText>
              </EmptyListContainer>
            }
          />
        </ListContainer>
        <FinishedQuestsTitle>Finished Quests</FinishedQuestsTitle>
        <ListContainer>
          <FlatList
            data={finishedQuests}
            renderItem={({ item, index }) => (
              <QuestItem
                quest={item}
                finished
                onEdit={() => {}}
                onDelete={() => {}}
                onStart={() => {}}
                onFinish={() => {}}
                index={index}
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