import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: #036635;
  margin-top: 8px;

  justify-content: center;
  align-items: center;

  flex-direction: row;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 20px;
`;
