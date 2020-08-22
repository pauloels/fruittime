import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { DateArray, HourArray } from './index';

interface SelectedDateProps {
  selected: boolean;
}

interface SelectedHourProps {
  selected: boolean;
}

interface RecurrentButtonProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #036635;
`;

export const Header = styled.View`
  width: 90%;
  margin-top: ${getStatusBarHeight() + 16}px;
`;

export const ViewImage = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogOutIcon = styled(FeatherIcon)``;

export const ImageLogo = styled.Image`
  margin-top: -100px;
  position: relative;
`;

export const ProfileButton = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const UserAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 2px;
  border-color: #fff;
`;

export const HeaderName = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'Roboto-Regular';
`;

export const UserName = styled.Text`
  margin-top: -15px;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const Content = styled.ScrollView`
  width: 100%;
`;

export const CreateReminderContainer = styled.View`
  flex: 1;
  background: #fff;
  margin-top: 60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  align-items: center;
`;

export const ContainerTitle = styled.Text`
  margin-top: 10px;
  color: #3c3d47;
  font-family: 'Roboto-Regular';
  font-size: 30px;
`;

export const DetailsDate = styled.View`
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;

export const WeekDay = styled.View`
  width: 90%;
`;

export const WeekDayHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const WeekDayInfo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const WeekDayTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #3c3d47;
`;

export const Recurrent = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #3c3d47;
`;

export const RecurrentButton = styled(RectButton)<RecurrentButtonProps>`
  background: ${props => (props.selected ? '#FA7D09' : '#cacaca')};
  margin-left: 5px;
  border-radius: 15px;
  height: 25px;
  width: 40px;
  align-items: ${props => (props.selected ? 'flex-end' : 'flex-start')};
  justify-content: center;
  padding: 2px;
`;

export const CircleButton = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #fff;
`;

export const WeekDayButtons = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  justify-content: center;
`;

export const FletListWeek = styled(FlatList as new () => FlatList<DateArray>)`
  flex: 1;
`;

export const WeekContainer = styled(RectButton)<SelectedDateProps>`
  background: ${props => (props.selected ? '#FA7D09' : '#008037')};
  border-radius: 15px;
  padding: 5px 8px;
  width: 50px;
  height: 35px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

export const TitleDay = styled.Text`
  font-family: 'Roboto-Bold';
  width: 35px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
`;

export const HourDay = styled.View`
  margin-top: 20px;
  width: 90%;
`;

export const HourHeader = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #3c3d47;
`;

export const HourButton = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const FlatListHour = styled(FlatList as new () => FlatList<HourArray>)``;

export const HourContainer = styled(RectButton)<SelectedHourProps>`
  flex-direction: row;
  align-items: center;
  background: ${props => (props.selected ? '#FA7D09' : '#008037')};
  padding: 5px 8px;
  border-radius: 15px;
  margin-left: 5px;
  height: 35px;
`;

export const TitleHour = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  color: #fff;
`;

export const DetailsFruit = styled.View`
  width: 90%;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

export const HeaderFruit = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #3c3d47;
`;

export const ContainerFruit = styled.View`
  margin-top: 65px;
  padding: 10px;
  border-radius: 15px;
  background: #008037;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ItemsFruit = styled.View`
  justify-content: center;
  align-items: center;
`;

export const AvatarFruit = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  margin-top: -55px;
`;

export const NameFruit = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 20px;
  color: #fff;
`;

export const DescriptionContainer = styled.View`
  width: 250px;
  padding: 5px;
`;

export const DescriptionFruit = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: #fff;
`;

export const IconContainer = styled.View`
  padding: 10px;
  width: 90%;
  align-items: flex-end;
`;

export const CreateReminderButton = styled(RectButton)`
  background: #008037;
  padding: 5px;
  width: 50px;
  border-radius: 15px;
  align-items: center;
`;
