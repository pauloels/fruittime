import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';

import { Reminder } from '../pages/Reminders';

import TabNavigation from './tabNavigation';
import Profile from '../pages/Profile';

// import { ReminderContext } from '../pages/Reminders';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => {
  // const { reminders } = useContext<Reminder[]>(ReminderContext);

  // console.log(reminders);

  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    PushNotification.configure({
      onRegister(token) {
        console.log('TOKEN:', token);
      },

      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: false,
    });

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false,
      },

      async taskId => {
        console.log('Received background-fetch event: ', taskId);

        // 3. Insert code you want to run in the background, for example:
        /**
        try {
          api.get('/reminders/me').then(response => {
            const formatedReminders = response.data.map(
              (reminder: Reminder) => ({
                ...reminder,
                date: format(parseISO(reminder.date), 'EEEE', { locale: ptBR }),
                hour: format(parseISO(reminder.date), 'HH:mm'),
                newDate: new Date(
                  format(
                    new Date(parseISO(reminder.date)).setMinutes(0, 0),
                    "yyyy-MM-dd'T'HH:mm:ss'Z'",
                    { locale: ptBR },
                  ),
                ),
              }),
            );
            setReminders(formatedReminders);
          });
        } catch (err) {
          console.log(err);
        }

        console.log(reminders);
         */

        const reminderDate = reminders.map(
          r =>
            new Date(
              format(
                new Date(r.newDate).setMinutes(0, 0),
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                {
                  locale: ptBR,
                },
              ),
            ),
        );

        const newDate = new Date(
          format(
            new Date(Date.now()).setMinutes(
              new Date(Date.now()).getMinutes() + 15,
              0,
            ),
            "yyyy-MM-dd'T'HH:mm:ss'Z'",
            {
              locale: ptBR,
            },
          ),
        );

        console.log(newDate);

        const nowDate = new Date(
          format(
            new Date(Date.now()).setMinutes(
              new Date(Date.now()).getMinutes() - 1,
              0,
            ),
            "yyyy-MM-dd'T'HH:mm:ss'Z'",
            {
              locale: ptBR,
            },
          ),
        );

        console.log(nowDate);

        reminders.forEach(r => {
          if (r.newDate <= newDate && r.newDate >= nowDate) {
            PushNotification.localNotification({
              title: 'Novo lembrete fruittime',
              message: `Hora de comer ${r.fruit}`,
              playSound: true,
              soundName: 'default',
            });
          }
        });

        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, [reminders]);
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Screen name="TabNavigation" component={TabNavigation} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export default AppRoutes;
