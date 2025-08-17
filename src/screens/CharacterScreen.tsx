import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import useCharacterStore from '../store/characterStore';
import useQuestStore from '../store/questStore';
import useTimerStore from '../store/timerStore';
import { useNavigation } from '@react-navigation/native';
import StyledButton from '../components/StyledButton';
import StatHexagon from '../components/StatHexagon';
import { monsters } from '../assets/monsters';

const CharacterContainer = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
`;

const CharacterDetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.large}px;
`;

const CharacterImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-right: ${(props) => props.theme.spacing.large}px;
`;

const CharacterInfo = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.text};
`;

const DetailsText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 32px;
`;

const CharacterScreen = () => {
  const { name, gender, classType, age } = useCharacterStore();
  const { quests } = useQuestStore();
  const { workDuration } = useTimerStore();
  const addQuest = useQuestStore((state) => state.addQuest);
  const setActiveQuest = useQuestStore((state) => state.setActiveQuest);
  const resetTime = useTimerStore((state) => state.resetTime);
  const navigation = useNavigation();
  const [gateOpen, setGateOpen] = useState(true);

  const totalTaskDuration = quests.reduce(
    (total, quest) => total + quest.duration,
    0
  );

  const handleStartRandomQuest = () => {
    const randomDuration = Math.floor(Math.random() * 60) + 25;
    const newQuest = {
      title: 'Random Quest',
      duration: randomDuration,
      isHard: false,
    };
    addQuest(newQuest);
    const quests = useQuestStore.getState().quests;
    const addedQuest = quests[quests.length - 1];
    setActiveQuest(addedQuest.id);
    resetTime();
    navigation.navigate('FocusBattle', {
      quest: addedQuest,
      monsterImage: monsters[addedQuest.monsterImage],
    });
  };

  return (
    <CharacterContainer>
      <CharacterDetailsContainer>
        <CharacterImage
          source={require('../assets/images/character/base.png')}
        />
        <CharacterInfo>
          <Name>{name}</Name>
          <DetailsText>
            {age} years old {gender} {classType}
          </DetailsText>
          <DetailsText>Task Duration: {workDuration} minutes</DetailsText>
          <DetailsText>Total Duration: {totalTaskDuration} minutes</DetailsText>
        </CharacterInfo>
      </CharacterDetailsContainer>
      <View style={{ alignItems: 'center' }}>
        <StatHexagon />
      </View>
      <ButtonContainer>
        <StyledButton
          title="Start Random Quest"
          onPress={handleStartRandomQuest}
        />
        <StyledButton
          title={gateOpen ? 'Close the Gate' : 'Open the Gate'}
          onPress={() => setGateOpen(!gateOpen)}
        />
      </ButtonContainer>
    </CharacterContainer>
  );
};

export default CharacterScreen;
