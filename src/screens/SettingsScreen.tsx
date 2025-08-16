import React, { useState } from 'react';
import { Alert, Keyboard, FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import useTimerStore from '../store/timerStore';
import useBlockedAppsStore from '../store/blockedAppsStore';
import useQuestStore from '../store/questStore';
import StyledButton from '../components/StyledButton';

const SettingsContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.large}px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  margin-top: ${(props) => props.theme.spacing.large}px;
`;

const BlockedAppItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

const BlockedAppName = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
`;

const InputContainer = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const Label = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

const Input = styled.TextInput`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
`;

function SettingsScreen() {
  const { workDuration, breakDuration, setDurations } = useTimerStore();
  const recalculatePomodoros = useQuestStore(
    (state) => state.recalculatePomodoros
  );
  const { blockedApps, addBlockedApp, removeBlockedApp } = useBlockedAppsStore();
  const [work, setWork] = useState(workDuration.toString());
  const [breakTime, setBreakTime] = useState(breakDuration.toString());
  const [newBlockedApp, setNewBlockedApp] = useState('');

  const handleSaveDurations = () => {
    const workMinutes = parseInt(work, 10);
    const breakMinutes = parseInt(breakTime, 10);

    if (isNaN(workMinutes) || isNaN(breakMinutes)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers');
      return;
    }

    setDurations(workMinutes, breakMinutes);
    recalculatePomodoros(workMinutes);
    Alert.alert('Settings Saved', 'Your new durations have been saved.');
    Keyboard.dismiss();
  };

  const handleAddBlockedApp = () => {
    if (newBlockedApp.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter an app name');
      return;
    }

    addBlockedApp(newBlockedApp);
    setNewBlockedApp('');
  };

  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <InputContainer>
        <Label>Work Duration (minutes)</Label>
        <Input
          value={work}
          onChangeText={setWork}
          keyboardType="numeric"
        />
      </InputContainer>
      <InputContainer>
        <Label>Break Duration (minutes)</Label>
        <Input
          value={breakTime}
          onChangeText={setBreakTime}
          keyboardType="numeric"
        />
      </InputContainer>
      <StyledButton title="Save Durations" onPress={handleSaveDurations} />

      <SectionTitle>Blocked Apps</SectionTitle>
      <InputContainer>
        <Label>Add App to Block</Label>
        <Input
          value={newBlockedApp}
          onChangeText={setNewBlockedApp}
          placeholder="e.g. com.instagram.android"
        />
        <StyledButton title="Add" onPress={handleAddBlockedApp} />
      </InputContainer>
      <FlatList
        data={blockedApps}
        renderItem={({ item }) => (
          <BlockedAppItem>
            <BlockedAppName>{item}</BlockedAppName>
            <View>
              <StyledButton
                title="Remove"
                onPress={() => removeBlockedApp(item)}
              />
            </View>
          </BlockedAppItem>
        )}
        keyExtractor={(item) => item}
      />
    </SettingsContainer>
  );
}

export default SettingsScreen;