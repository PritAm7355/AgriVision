// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PumpLogsScreen from '../screens/PumpLogsScreen';
import UltrasonicLogsScreen from '../screens/UltrasonicLogsScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash has no header */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Home screen with header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Agri Vision', // Header title
            headerStyle: {
              backgroundColor: '#4CAF50', // Header background
            },
            headerTintColor: '#fff', // Text and back arrow color
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        <Stack.Screen
          name="PumpLogs"
          component={PumpLogsScreen}
          options={{
            title: 'Pump Logs',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        <Stack.Screen
          name="UltrasonicLogs"
          component={UltrasonicLogsScreen}
          options={{
            title: 'Ultrasonic Logs',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
