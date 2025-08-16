import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import useCharacterStore from '../store/characterStore';

const GoldCounterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const GoldText = styled.Text`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.white};
  margin-left: 8px;
`;

const GoldCounter = () => {
  const { gold } = useCharacterStore();

  return (
    <GoldCounterContainer>
      <Image
        source={require('../assets/images/coin-icon.png')}
        style={{ width: 24, height: 24 }}
      />
      <GoldText>{gold}</GoldText>
    </GoldCounterContainer>
  );
};

export default GoldCounter;
