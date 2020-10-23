import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const UserAvatarButton = styled(RectButton)`
  margin: 0 0 10px;
`;

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

export const IconCamera = styled.View`
  align-self: flex-end;
  margin-top: -25px;
  margin-right: 20px;
  padding: 5px;
  background: #fa7d09;
  border-radius: 15px;
`;

export const BackArrow = styled(RectButton)`
  margin: -30px 350px 10px 0;
`;
