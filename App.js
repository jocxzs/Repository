import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen.js';
import CharacterList from './src/screens/CharacterList.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="CharacterList"
          component={CharacterList}
          options={{ 
            title: 'Character List',
            headerStyle: { backgroundColor: '#252525ff' },
            headerTintColor: '#e6e6e6ff',
            headerTitleStyle: { fontWeight: 'bold' },
           }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Home',
            headerStyle: { backgroundColor: '#252525ff' },
            headerTintColor: '#e6e6e6ff',
            headerTitleStyle: { fontWeight: 'bold' },
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
