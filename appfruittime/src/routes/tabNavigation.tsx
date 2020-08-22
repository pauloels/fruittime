import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Water from '../pages/Water';
import Reminders from '../pages/Reminders';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 84 : 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
        safeAreaInsets: {
          bottom: 0,
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: Platform.OS === 'ios' ? 24 : 20,
        },
        labelStyle: {
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#036635',
        activeBackgroundColor: '#036635',
        inactiveTintColor: '#bebebe',
        activeTintColor: '#fff',
        keyboardHidesTabBar: true,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icons name="home" size={size} color={focused ? '#fff' : color} />
            );
          },
        }}
      />

      <Screen
        name="Reminders"
        component={Reminders}
        options={{
          tabBarLabel: 'Lembretes',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icons name="list" size={size} color={focused ? '#fff' : color} />
            );
          },
        }}
      />

      <Screen
        name="Water"
        component={Water}
        options={{
          tabBarLabel: 'Água',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icons
                name="droplet"
                size={size}
                color={focused ? '#fff' : color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

export default TabNavigation;
