import 'react-native-gesture-handler'; // sempre importar no começo de acordo com a docuementação

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // deve ficar envolta de tudo

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AppProvider>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
