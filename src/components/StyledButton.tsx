import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.medium}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
`;

interface StyledButtonProps {
  title: string;
  onPress: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default StyledButton;
