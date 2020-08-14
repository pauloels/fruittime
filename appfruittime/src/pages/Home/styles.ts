import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #036635;
`;

export const Header = styled.View`
  width: 90%;
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const ViewImage = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogOutIcon = styled(FeatherIcon)``;

export const ImageLogo = styled.Image`
  margin-top: -50px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: 2px;
  border-color: #fff;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const UserName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;
