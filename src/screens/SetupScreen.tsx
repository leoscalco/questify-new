import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import useCharacterStore from '../store/characterStore';
import useTimerStore from '../store/timerStore';
import useSetupStore from '../store/setupStore';
import StyledButton from '../components/StyledButton';

const SetupContainer = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.large}px;
  text-align: center;
`;

const InputContainer = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const Label = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

const Input = styled.TextInput`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.accent : props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
`;

const OptionText = styled.Text<{ selected: boolean }>`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.text};
`;

const SetupScreen = () => {
  const { setName, setGender, setClassType, setAge } = useCharacterStore();
  const { setDurations } = useTimerStore();
  const { completeSetup } = useSetupStore();
  const [name, _setName] = useState('');
  const [age, _setAge] = useState('');
  const [gender, _setGender] = useState('Male');
  const [classType, _setClassType] = useState('Warrior');
  const [workDuration, _setWorkDuration] = useState('25');
  const [breakDuration, _setBreakDuration] = useState('5');

  const handleCompleteSetup = () => {
    setName(name);
    setAge(parseInt(age, 10));
    setGender(gender);
    setClassType(classType);
    setDurations(parseInt(workDuration, 10), parseInt(breakDuration, 10));
    completeSetup();
  };

  return (
    <SetupContainer>
      <Title>Create Your Hero</Title>
      <InputContainer>
        <Label>Name</Label>
        <Input value={name} onChangeText={_setName} />
      </InputContainer>
      <InputContainer>
        <Label>Age</Label>
        <Input value={age} onChangeText={_setAge} keyboardType="numeric" />
      </InputContainer>
      <InputContainer>
        <Label>Gender</Label>
        <OptionsContainer>
          <OptionButton
            selected={gender === 'Male'}
            onPress={() => _setGender('Male')}>
            <OptionText selected={gender === 'Male'}>Male</OptionText>
          </OptionButton>
          <OptionButton
            selected={gender === 'Female'}
            onPress={() => _setGender('Female')}>
            <OptionText selected={gender === 'Female'}>Female</OptionText>
          </OptionButton>
        </OptionsContainer>
      </InputContainer>
      <InputContainer>
        <Label>Class</Label>
        <OptionsContainer>
          <OptionButton
            selected={classType === 'Warrior'}
            onPress={() => _setClassType('Warrior')}>
            <OptionText selected={classType === 'Warrior'}>Warrior</OptionText>
          </OptionButton>
          <OptionButton
            selected={classType === 'Mage'}
            onPress={() => _setClassType('Mage')}>
            <OptionText selected={classType === 'Mage'}>Mage</OptionText>
          </OptionButton>
          <OptionButton
            selected={classType === 'Archer'}
            onPress={() => _setClassType('Archer')}>
            <OptionText selected={classType === 'Archer'}>Archer</OptionText>
          </OptionButton>
        </OptionsContainer>
      </InputContainer>
      <InputContainer>
        <Label>Work Duration (minutes)</Label>
        <Input
          value={workDuration}
          onChangeText={_setWorkDuration}
          keyboardType="numeric"
        />
      </InputContainer>
      <InputContainer>
        <Label>Break Duration (minutes)</Label>
        <Input
          value={breakDuration}
          onChangeText={_setBreakDuration}
          keyboardType="numeric"
        />
      </InputContainer>
      <StyledButton title="Start Your Adventure" onPress={handleCompleteSetup} />
    </SetupContainer>
  );
};

export default SetupScreen;
