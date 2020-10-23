import React, { useCallback, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';
import SearchInput from '../../components/SearchInput';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import {
  Container,
  Header,
  ImageLogo,
  LogOutIcon,
  ViewImage,
  HeaderName,
  UserName,
  ProfileButton,
  UserAvatar,
  Content,
  CreateReminderContainer,
  ContainerTitle,
  DetailsDate,
  WeekDay,
  WeekDayHeader,
  WeekDayInfo,
  WeekDayTitle,
  Recurrent,
  RecurrentButton,
  CircleButton,
  WeekDayButtons,
  FletListWeek,
  WeekContainer,
  HourDay,
  HourHeader,
  HourButton,
  FlatListHour,
  HourContainer,
  TitleHour,
  DetailsFruit,
  HeaderFruit,
  HeaderTitle,
  ContainerFruit,
  ItemsFruit,
  AvatarFruit,
  NameFruit,
  DescriptionContainer,
  DescriptionFruit,
  IconContainer,
  CreateReminderButton,
  TitleDay,
} from './styles';

export interface DateArray {
  id: number;
  date: string;
  select: boolean;
}

export interface HourArray {
  id: number;
  hour: string;
  select: boolean;
}

interface Fruit {
  id: string;
  fruit: string;
  vitamins: string;
  avatar_url: string;
}

const Home: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate, reset } = useNavigation();

  const [fruit, setFruit] = useState<Fruit>({} as Fruit);
  const [currentWeek, setCurrentWeek] = useState<DateArray[]>([]);
  const [hourDay, setHourDay] = useState<HourArray[]>([]);
  const [recurrent, setRecurrent] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dateWeek, setDateWeek] = useState<string[]>([]);

  const hadleRecurrent = useCallback(() => {
    setRecurrent(!recurrent);
  }, [recurrent]);

  useEffect(() => {
    const weekDay = {
      dataDate: [
        { id: 0, date: '1' },
        { id: 1, date: '1' },
        { id: 2, date: '1' },
        { id: 3, date: '1' },
        { id: 4, date: '1' },
        { id: 5, date: '1' },
        { id: 6, date: '1' },
      ],
    };

    const thisWeek = weekDay.dataDate.map(d => ({
      ...d,
      id: new Date().setDate(new Date().getDate() + d.id),
      date: format(new Date().setDate(new Date().getDate() + d.id), 'ccc', {
        locale: ptBR,
      }),
      select: false,
    }));

    setCurrentWeek(thisWeek);
  }, []);

  useEffect(() => {
    const listHour = [];
    for (let c = 1; c <= 24; c += 1) {
      const arrayHour = {
        id: c,
        hour: format(new Date().setHours(c, 0, 0), 'HH:mm'),
        select: false,
      };
      listHour.push(arrayHour);
    }

    setHourDay(listHour);
  }, []);

  const handleSelectDate = useCallback(
    (item: number) => {
      const newCurrentWeek = currentWeek.map(w =>
        w.id === item ? { ...w, select: !w.select } : { ...w },
      );

      setCurrentWeek(newCurrentWeek);
    },
    [currentWeek],
  );

  const handleSelectDateHour = useCallback(
    (item: number) => {
      const newHourDay = hourDay.map(h =>
        h.id === item ? { ...h, select: !h.select } : { ...h },
      );

      setHourDay(newHourDay);
    },
    [hourDay],
  );

  useEffect(() => {
    const newHour = hourDay
      .filter(h => h.select === true)
      .map(h =>
        currentWeek
          .filter(w => w.select === true)
          .map(w => ({
            date: format(
              new Date(w.id).setHours(h.id, 0, 0),
              'yyyy-MM-dd HH:mm:ss',
            ),
          })),
      );

    const result: string[] = [];
    newHour.forEach(item => item.map(i => result.push(i.date)));

    setDateWeek(result);
  }, [currentWeek, hourDay]);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        const response = await api.get('/fruits', {
          params: { fruit: searchValue },
        });

        setFruit(response.data);
      } catch (err) {
        setFruit([]);
      }
    }

    loadFoods();
  }, [searchValue]);

  const handleCreateReminder = useCallback(async () => {
    if (dateWeek.length < 1 || !fruit.fruit) {
      Alert.alert(
        'Selecionar os campos!',
        'Para poder criar um lembrete selecione todos os campos.',
      );
    } else {
      try {
        await api.post('/reminders', {
          fruit: fruit.fruit,
          recurrent,
          date: dateWeek,
        });

        reset({
          routes: [{ name: 'Reminders' }],
          index: 0,
        });

        setRecurrent(false);

        setDateWeek([]);
      } catch (err) {
        Alert.alert(
          'Erro ao criar o lembrete',
          'Ocorreu um erro ao criar o agendamento, tente novamente.',
        );
      }
    }
  }, [dateWeek, fruit, recurrent, reset]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <ViewImage>
          <LogOutIcon onPress={signOut} name="power" size={30} color="#fff" />

          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
            <HeaderName>
              Bem vindo,
              {'\n'}
            </HeaderName>
            <UserName>{user.name}</UserName>
          </ProfileButton>
        </ViewImage>
      </Header>

      <ImageLogo source={logo} />

      <Content>
        <CreateReminderContainer>
          <ContainerTitle>Crie seu lembrete</ContainerTitle>

          <DetailsDate>
            <WeekDay>
              <WeekDayHeader>
                <WeekDayInfo>
                  <WeekDayTitle>Dias da Semana</WeekDayTitle>
                  <Recurrent>Recorrente?</Recurrent>
                </WeekDayInfo>

                <RecurrentButton
                  onPress={() => hadleRecurrent()}
                  selected={recurrent === true}
                >
                  <CircleButton />
                </RecurrentButton>
              </WeekDayHeader>
              <WeekDayButtons>
                <FletListWeek
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={currentWeek}
                  keyExtractor={item => JSON.stringify(item.id)}
                  renderItem={({ item }) => (
                    <WeekContainer
                      onPress={() => handleSelectDate(item.id)}
                      selected={item.select === true}
                    >
                      <TitleDay>{item.date}</TitleDay>
                    </WeekContainer>
                  )}
                />
              </WeekDayButtons>
            </WeekDay>

            <HourDay>
              <HourHeader>Horários</HourHeader>
              <HourButton>
                <FlatListHour
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={hourDay}
                  keyExtractor={item => JSON.stringify(item.id)}
                  renderItem={({ item }) => (
                    <HourContainer
                      onPress={() => handleSelectDateHour(item.id)}
                      selected={item.select === true}
                    >
                      <TitleHour>{item.hour}</TitleHour>
                    </HourContainer>
                  )}
                />
              </HourButton>
            </HourDay>
          </DetailsDate>

          <DetailsFruit>
            <HeaderFruit>
              <HeaderTitle>Frutas</HeaderTitle>

              <SearchInput
                autoCapitalize="none"
                name="fruit"
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder="Qual fruta você procura?"
              />
            </HeaderFruit>
            <ContainerFruit>
              <ItemsFruit>
                <AvatarFruit source={{ uri: fruit.avatar_url }} />
                <NameFruit>{fruit.fruit}</NameFruit>
              </ItemsFruit>
              <DescriptionContainer>
                <DescriptionFruit>{fruit.vitamins}</DescriptionFruit>
              </DescriptionContainer>
            </ContainerFruit>
          </DetailsFruit>
          <IconContainer>
            <CreateReminderButton onPress={handleCreateReminder}>
              <Icon name="save" size={30} color="#fff" />
            </CreateReminderButton>
          </IconContainer>
        </CreateReminderContainer>
      </Content>
    </Container>
  );
};

export default Home;
