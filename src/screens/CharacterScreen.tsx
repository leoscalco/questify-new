import React from 'react';
import styled from 'styled-components/native';

const CharacterContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.large}px;
  align-items: center;
`;

const CharacterImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: ${(props) => props.theme.spacing.large}px;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.large}px;
`;

function CharacterScreen() {
  return (
    <CharacterContainer>
      <Title>Your Hero</Title>
      <CharacterImage
        source={require('../assets/images/character/base.png')}
      />
    </CharacterContainer>
  );
}

export default CharacterScreen;
