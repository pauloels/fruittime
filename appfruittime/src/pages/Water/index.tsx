import React, { useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import logo from '../../assets/logo.png';
import waterImage from '../../assets/water-image.jpg';
import SearchInputWater from '../../components/SearchInputWater';

import {
  Container,
  Header,
  ProfileButton,
  ImageLogo,
  WaterContainer,
  WaterContainerTitle,
  WaterContainerDetails,
  WaterImage,
  Title,
  WaterContainerItems,
  Detals,
  DetailsItems,
  GoalContainer,
  Goal,
  TimeContainer,
  LessButton,
  MoreButton,
  Time,
  DropDescription,
  WaterContainerDrop,
  DropContainer,
  HourDrop,
  Drop,
} from './styles';

import { RecurrentButton, CircleButton, UserAvatar } from '../Home/styles';

export interface HourArray {
  id: number;
  hour: string;
  select: boolean;
}

const Water: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const [hourDay, setHourDay] = useState<HourArray[]>([]);
  const [startToDink, setStartToDink] = useState(false);
  const [weightValue, setWeightValue] = useState('');
  const [timeValue, setTimeValue] = useState(8);

  const handleStart = useCallback(() => {
    setStartToDink(!startToDink);
  }, [startToDink]);

  const handleDrop = useCallback(
    (item: number) => {
      const newHourDay = hourDay.map(h =>
        h.id === item ? { ...h, select: !h.select } : { ...h },
      );

      setHourDay(newHourDay);
    },
    [hourDay],
  );

  const handleLessButton = useCallback(() => {
    if (timeValue > 0) {
      setTimeValue(timeValue - 1);
    }
  }, [timeValue]);

  const handleMoreButton = useCallback(() => {
    if (timeValue < 23) {
      setTimeValue(timeValue + 1);
    }
  }, [timeValue]);

  useEffect(() => {
    const listHour = [];
    const meta = Number(weightValue) * 35;
    const waterGlass = meta / (Number(weightValue) > 90 ? 300 : 210);

    if (weightValue) {
      for (let c = 0; c <= waterGlass; c += 1) {
        const arrayHour = {
          id: timeValue + c,
          hour: format(new Date().setHours(timeValue + c, 0, 0), 'HH:mm'),
          select: false,
        };
        listHour.push(arrayHour);
      }

      setHourDay(listHour);
    }
  }, [weightValue, timeValue]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <ImageLogo source={logo} />
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <WaterContainer>
        <WaterContainerTitle>Beba água</WaterContainerTitle>
        <WaterContainerDetails>
          <WaterImage source={waterImage} />
          <Title>Vamos começar?</Title>
          <WaterContainerItems>
            <Detals>
              <DetailsItems>
                <Title>Peso:</Title>

                <SearchInputWater
                  autoCapitalize="none"
                  value={weightValue}
                  onChangeText={setWeightValue}
                  keyboardType="numeric"
                />
              </DetailsItems>

              <DetailsItems>
                <Title>Meta:</Title>
                <GoalContainer>
                  <Goal>
                    {(Number(weightValue) * 35)
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Goal>
                </GoalContainer>
              </DetailsItems>
            </Detals>

            <Detals>
              <DetailsItems>
                <Icon
                  name="clock"
                  size={25}
                  color="#fff"
                  style={{ marginRight: 5 }}
                />

                <TimeContainer>
                  <LessButton onPress={handleLessButton}>
                    <Icon
                      name="minus-circle"
                      size={16}
                      color="#fff"
                      style={{ marginRight: 3 }}
                    />
                  </LessButton>
                  <Time>
                    {timeValue < 10 ? `0${timeValue}` : timeValue}
                    :00
                  </Time>
                  <MoreButton onPress={handleMoreButton}>
                    <Icon
                      name="plus-circle"
                      size={16}
                      color="#fff"
                      style={{ marginLeft: 3 }}
                    />
                  </MoreButton>
                </TimeContainer>
              </DetailsItems>

              <DetailsItems>
                <Icon
                  name={`${startToDink ? 'smile' : 'frown'}`}
                  size={25}
                  color="#fff"
                />
                <RecurrentButton
                  onPress={handleStart}
                  selected={startToDink === true}
                >
                  <CircleButton />
                </RecurrentButton>
              </DetailsItems>
            </Detals>
          </WaterContainerItems>
        </WaterContainerDetails>
        <DropDescription>
          Cada gota corresponde à {Number(weightValue) > 90 ? 300 : 210}
          ml.
        </DropDescription>
        <WaterContainerDrop>
          {hourDay.map(d => (
            <DropContainer key={d.id}>
              <HourDrop>{d.hour}</HourDrop>
              <Drop
                onPress={() => handleDrop(d.id)}
                selected={d.select === true}
              />
            </DropContainer>
          ))}
        </WaterContainerDrop>
      </WaterContainer>
    </Container>
  );
};

export default Water;
