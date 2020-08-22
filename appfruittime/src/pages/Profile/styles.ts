import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const UserAvatarButton = styled(RectButton)``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  border-width: 2px;
  border-color: #fff;

  align-self: center;
`;

export const ImageBackgroundStyle = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const BackArrow = styled(RectButton)`
  margin: -50px 300px 20px 0;
`;
