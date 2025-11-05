import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
return (
<GestureHandlerRootView style={{ flex: 1 }}>
<SafeAreaProvider>
<NavigationContainer>
<RootStack />
</NavigationContainer>
</SafeAreaProvider>
</GestureHandlerRootView>
);
}