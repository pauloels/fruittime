import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  ImageLogo,
  RemindersPlace,
  RemindersList,
  FruitName,
  RemindersTitle,
  ReminderContainer,
  FruitAvatar,
  ReminderDetails,
  ReminderDate,
  WeekDay,
  ReminderHour,
  Hour,
} from './styles';
import api from '../../services/api';

interface Fruit {
  avatar_url: string;
}

export interface Reminder {
  id: string;
  fruit: string;
  date: string;
  avatar_url: string;
  fruits: Fruit;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    api.get('/reminders/me').then(response => {
      setReminders(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <ImageLogo source={logo} />
      </Header>
      <RemindersPlace>
        <RemindersTitle>Lembretes</RemindersTitle>
        <RemindersList
          data={reminders}
          keyExtractor={reminder => reminder.id}
          renderItem={({ item: reminder }) => (
            <ReminderContainer>
              <FruitAvatar source={{ uri: reminder.fruits.avatar_url }} />
              <ReminderDetails>
                <FruitName>{reminder.fruit}</FruitName>
                <ReminderDate>
                  <Icon name="calendar" size={14} color="#fff" />
                  <WeekDay>{reminder.date}</WeekDay>
                </ReminderDate>

                <ReminderHour>
                  <Icon name="clock" size={18} color="#fff" />
                  <Hour>08:00</Hour>
                </ReminderHour>
              </ReminderDetails>
              <Icon name="trash-2" size={18} color="#fff" />
            </ReminderContainer>
          )}
        />
      </RemindersPlace>
    </Container>
  );
};

export default Reminders;
