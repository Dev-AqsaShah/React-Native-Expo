import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';


export type RootStackParamList = {
Welcome: undefined;
SignIn: undefined;
SignUp: undefined;
Home: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="Welcome" component={WelcomeScreen} />
<Stack.Screen name="SignIn" component={SignInScreen} />
<Stack.Screen name="SignUp" component={SignUpScreen} />
<Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>
);
}