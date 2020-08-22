import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DropProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #3dade6;
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

export const WaterContainer = styled.View`
  flex: 1;
  background: #f4f4f4;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const WaterContainerTitle = styled.Text`
  margin-top: 16px;
  color: #3c3d47;
  font-family: 'Roboto-Regular';
  font-size: 30px;
`;

export const WaterContainerDetails = styled.View`
  background: #3dade6;
  width: 90%;
  margin-top: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 0 0 15px;
`;

export const WaterImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  margin-top: -50px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin-top: 5px;
`;

export const WaterContainerItems = styled.View`
  margin-top: 5px;
  width: 60%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Detals = styled.View`
  align-items: flex-start;
  justify-content: space-between;
  height: 60px;
`;

export const DetailsItems = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const InputWeight = styled.Text`
  margin-left: 10px;
  margin-top: 5px;
`;

export const GoalContainer = styled.View`
  margin-left: 5px;
  margin-top: 5px;
  background: #fff;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #bebebe;
`;

export const Goal = styled.Text`
  margin-left: 5px;
  color: #3c3d47;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const TimeContainer = styled.View`
  background: #bebebe;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 5px;
`;

export const LessButton = styled.TouchableOpacity`
  background: #bebebe;
`;

export const MoreButton = styled.TouchableOpacity`
  background: #bebebe;
`;

export const Time = styled.Text`
  color: #3c3d47;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  background-color: #fff;
`;

export const DropDescription = styled.Text`
  color: #3c3d47;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin-top: 10px;
`;

export const WaterContainerDrop = styled.View`
  flex: 1;
  margin-top: 10px;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const DropContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #3c3d47;
  padding: 5px;
  width: 70px;
  height: 35px;
  border-radius: 10px;
  margin-left: 6px;
`;

export const HourDrop = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Bold';
`;

export const Drop = styled.TouchableOpacity<DropProps>`
  background: ${props => (props.selected ? '#3DADE6' : '#fff')};
  width: 16px;
  height: 16px;
  border-top-left-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transform: rotate(45deg);
`;
