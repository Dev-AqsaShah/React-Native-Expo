// src/navigation/index.tsx
import { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/Signup';
import Home from '../screens/Home';

// <-- named export for the route param list
export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

// Use any to avoid TS overload problems for now
const Stack: any = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome as any} />
      <Stack.Screen name="SignIn" component={SignIn as any} />
      <Stack.Screen name="SignUp" component={SignUp as any} />
      <Stack.Screen name="Home" component={Home as any} />
    </Stack.Navigator>
  );
}
