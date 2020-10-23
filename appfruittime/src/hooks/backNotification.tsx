import React, { useEffect, useState } from 'react';

import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';

import { Reminder } from '../pages/Reminders';

const Back = () => {
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
      },

      async taskId => {
        console.log('Received background-fetch event: ', taskId);

        PushNotification.localNotification({
          title: 'Novo lembrete fruittime',
          message: `Hora de comer fruta`,
          playSound: true,
          soundName: 'default',
        });

        // 3. Insert code you want to run in the background, for example:
        try {
          api.get('/reminders/me').then(response => {
            const formatedReminders = response.data.map(
              (reminder: Reminder) => ({
                ...reminder,
                date: format(parseISO(reminder.date), 'EEEE', { locale: ptBR }),
                hour: format(parseISO(reminder.date), 'HH:mm'),
                newDate: new Date(parseISO(reminder.date)),
              }),
            );
            setReminders(formatedReminders);
          });
        } catch (err) {
          console.log(err);
        }

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

        console.log(reminderDate);

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

        const oldDate = new Date(
          format(
            new Date(Date.now()).setMinutes(
              new Date(Date.now()).getMinutes() - 15,
              0,
            ),
            "yyyy-MM-dd'T'HH:mm:ss'Z'",
            {
              locale: ptBR,
            },
          ),
        );

        console.log(oldDate);

        for (let c = 0; c <= reminderDate.length; c = +1) {
          const thisDate = reminderDate[c];

          if (thisDate <= newDate && thisDate >= oldDate) {
            PushNotification.localNotification({
              title: 'Novo lembrete fruittime',
              message: `Hora de comer fruta`,
              playSound: true,
              soundName: 'default',
            });
          }
        }

        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, [reminders]);
};

export default Back;
