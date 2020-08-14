import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './tabNavigation';
import Profile from '../pages/Profile';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => (
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

export default AppRoutes;
