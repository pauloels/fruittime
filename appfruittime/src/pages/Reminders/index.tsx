import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  ProfileButton,
  ImageLogo,
  RemindersPlace,
  RemindersList,
  FruitName,
  RemindersTitle,
  ReminderContainer,
  ReminderItems,
  FruitAvatar,
  ReminderDetails,
  ReminderDate,
  WeekDay,
  ReminderHour,
  Hour,
} from './styles';
import api from '../../services/api';

import { UserAvatar } from '../Home/styles';

interface Fruit {
  avatar_url: string;
  fruit: string;
}

export interface Reminder {
  id: string;
  fruit: string;
  date: string;
  hour: string;
  avatar_url: string;
  fruits: Fruit;
}

const Reminders: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    api.get('/reminders/me').then(response => {
      const formatedReminders = response.data.map((reminder: Reminder) => ({
        ...reminder,
        date: format(parseISO(reminder.date), 'EEEE', { locale: ptBR }),
        hour: format(parseISO(reminder.date), 'HH:mm'),
      }));
      setReminders(formatedReminders);
    });
  }, []);

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
      <RemindersPlace>
        <RemindersTitle>Lembretes</RemindersTitle>
        <RemindersList
          data={reminders}
          showsVerticalScrollIndicator={false}
          keyExtractor={reminder => reminder.id}
          renderItem={({ item: reminder }) => (
            <ReminderContainer>
              <ReminderItems>
                <FruitAvatar source={{ uri: reminder.fruits.avatar_url }} />
                <ReminderDetails>
                  <FruitName>{reminder.fruits.fruit}</FruitName>
                  <ReminderDate>
                    <Icon name="calendar" size={20} color="#fff" />
                    <WeekDay>{reminder.date}</WeekDay>
                  </ReminderDate>

                  <ReminderHour>
                    <Icon name="clock" size={20} color="#fff" />
                    <Hour>{reminder.hour}</Hour>
                  </ReminderHour>
                </ReminderDetails>
                <Icon
                  name="trash-2"
                  size={18}
                  color="#fff"
                  style={{ marginTop: -70 }}
                />
              </ReminderItems>
            </ReminderContainer>
          )}
        />
      </RemindersPlace>
    </Container>
  );
};

export default Reminders;
