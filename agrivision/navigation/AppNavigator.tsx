// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PumpLogsScreen from '../screens/PumpLogsScreen';
import UltrasonicLogsScreen from '../screens/UltrasonicLogsScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AgriScreenData from '../screens/AgriDataScreen';
import UploadPage from '../screens/UploadImgScreen';
import ScanScreen from '../screens/Satellite/ScanScreen';
import MapScreen from '../screens/Satellite/MapScreen';
import { RootStackParamList } from './types';
import DeviceScreen from '../screens/Device/DeviceScreen';
import InsideDeviceScreen from '../screens/Device/InsideDevScreen';
import DeviceStatus from '../components/DeviceStatus';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
        screenOptions={{
          headerRight: () => <DeviceStatus />,
        }}>

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Agri Vision',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="PumpLogs"
          component={PumpLogsScreen}
          options={{
            title: 'Pump Logs',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="UltrasonicLogs"
          component={UltrasonicLogsScreen}
          options={{
            title: 'Ultrasonic Logs',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="AgriScreenData"
          component={AgriScreenData}
          options={{
            title: 'Agri Data',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="UploadPage"
          component={UploadPage}
          options={{
            title: 'Upload Plant Image',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            title: 'Scan Field',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: 'Satellite Map',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />

        <Stack.Screen
          name="DeviceScreen"
          component={DeviceScreen}
          options={{
            title: 'Device',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />

        <Stack.Screen
          name="InsideDeviceScreen"
          component={InsideDeviceScreen}
          options={{
            title: 'Device',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
