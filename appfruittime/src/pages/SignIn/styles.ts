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

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const ForgotPasswordText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const CreateAccountButton = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: #036635;
  margin-top: 40px;

  justify-content: center;
  align-items: center;

  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 20px;
  margin-left: 16px;
`;
