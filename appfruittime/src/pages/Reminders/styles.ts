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
  margin-top: 24px;
  width: 80%;
`;

export const FruitName = styled.Text``;

export const RemindersTitle = styled.Text`
  margin-top: 16px;
  color: #3c3d47;
  font-family: 'Roboto-Regular';
  font-size: 30px;
`;

export const ReminderContainer = styled.View`
  background: #008037;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FruitAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  border: 2px;
  border-color: #fff;
`;

export const ReminderDate = styled.View``;

export const ReminderDetails = styled.View``;

export const WeekDay = styled.Text``;

export const ReminderHour = styled.View``;

export const Hour = styled.Text``;
