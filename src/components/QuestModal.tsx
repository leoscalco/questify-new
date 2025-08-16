import React from 'react';
import { Modal, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

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
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.medium}px;
  text-align: center;
`;

const Input = styled.TextInput`
  font-family: ${(props) => props.theme.fonts.main};
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
  onSubmit: (title: string, totalPomodoros: number) => void;
}

const QuestModal = ({ visible, onClose, onSubmit }: QuestModalProps) => {
  const [title, setTitle] = React.useState('');
  const [totalPomodoros, setTotalPomodoros] = React.useState('');

  const handleSubmit = () => {
    onSubmit(title, parseInt(totalPomodoros, 10));
    setTitle('');
    setTotalPomodoros('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <ModalContainer>
        <ModalContent>
          <Title>Add Quest</Title>
          <Input
            placeholder="Quest Title"
            value={title}
            onChangeText={setTitle}
          />
          <Input
            placeholder="Total Pomodoros"
            value={totalPomodoros}
            onChangeText={setTotalPomodoros}
            keyboardType="numeric"
          />
          <Button title="Add" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} />
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default QuestModal;