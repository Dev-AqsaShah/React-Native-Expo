// App.tsx
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation'; // <- ensure this path is correct

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
