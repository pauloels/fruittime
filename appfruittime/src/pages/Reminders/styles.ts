import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Reminder } from './index';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #036635;
`;

export const Header = styled.View`
  padding-top: ${getStatusBarHeight() + 24}px;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-top: -60px;
  align-self: flex-end;
`;

export const ImageLogo = styled.Image``;

export const RemindersPlace = styled.View`
  flex: 1;
  background: #fff;
  width: 100%;
  margin-top: 24px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const RemindersList = styled(FlatList as new () => FlatList<Reminder>)`
  flex: 1;
  margin-top: 16px;
  width: 100%;
`;

export const RemindersTitle = styled.Text`
  margin-top: 10px;
  color: #3c3d47;
  font-family: 'Roboto-Regular';
  font-size: 30px;
`;

export const FruitName = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 25px;
  color: #fff;
`;

export const ReminderContainer = styled.View`
  width: 100%;
  border-radius: 10px;
  align-items: center;
`;

export const ReminderItems = styled.View`
  background: #008037;
  padding: 10px;
  width: 80%;
  border-radius: 20px;
  margin-bottom: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
`;

export const FruitAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  margin-left: -50px;
`;

export const ReminderDetails = styled.View`
  height: 100%;
  margin-left: -70px;
`;

export const ReminderDate = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const WeekDay = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
`;

export const ReminderHour = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Hour = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
`;
