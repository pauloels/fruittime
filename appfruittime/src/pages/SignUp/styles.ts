import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const ImageBackgroundStyle = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const ImageLogo = styled.Image`
  margin: 26px 0 64px;
  width: 250px;
  height: 100px;
`;

export const BackArrow = styled(RectButton)`
  margin: -50px 300px 20px 0;
`;
