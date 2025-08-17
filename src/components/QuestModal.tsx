import React, { useEffect, useState } from 'react';
import { Modal, Switch, View } from 'react-native';
import styled from 'styled-components/native';
import { Quest } from '../store/questStore';
import StyledButton from './StyledButton';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  text-align: center;
`;

const Input = styled.TextInput`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

interface QuestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, duration: number, isHard: boolean) => void;
  questToEdit?: Quest | null;
}

const QuestModal = ({
  visible,
  onClose,
  onSubmit,
  questToEdit,
}: QuestModalProps) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [isHard, setIsHard] = useState(false);

  useEffect(() => {
    if (questToEdit) {
      setTitle(questToEdit.title);
      setDuration(questToEdit.duration.toString());
      setIsHard(questToEdit.isHard || false);
    } else {
      setTitle('');
      setDuration('');
      setIsHard(false);
    }
  }, [questToEdit, visible]);

  const handleSubmit = () => {
    onSubmit(title, parseInt(duration, 10), isHard);
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDuration('');
    setIsHard(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <ModalContainer>
        <ModalContent>
          <Title>{questToEdit ? 'Edit Quest' : 'Add Quest'}</Title>
          <Input
            placeholder="Quest Title"
            value={title}
            onChangeText={setTitle}
          />
          <Input
            placeholder="Duration (minutes)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Switch value={isHard} onValueChange={setIsHard} />
            <Title>Hard Mode</Title>
          </View>
          <StyledButton
            title={questToEdit ? 'Save' : 'Add'}
            onPress={handleSubmit}
          />
          <StyledButton title="Cancel" onPress={handleClose} />
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default QuestModal;