import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/routes';
import Store from './src/context/Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Store>
          <Route/>
        </Store>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}