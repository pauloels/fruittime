import React, { createContext, useState } from 'react';

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
  newDate: Date;
}

export const ReminderContext = createContext<Reminder[] | any>([]);

export const UserReminder: React.FC = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  return (
    <ReminderContext.Provider value={{ reminders, setReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
