// src/navigation/MainTabs.tsx
import React, { JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Update these imports to match your actual screen filenames/exports
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import Orders from '../screens/Order';
import About from '../screens/About';
import ContactUs from '../screens/Contact';

const Tab: any = createBottomTabNavigator();

export default function MainTabs(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#002855',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0.5, height: 64 },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile as any}
        options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }: any) => <Ionicons name="person-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Products"
        component={Products as any}
        options={{ tabBarLabel: 'Products', tabBarIcon: ({ color, size }: any) => <Ionicons name="pricetags-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders as any}
        options={{ tabBarLabel: 'Orders', tabBarIcon: ({ color, size }: any) => <Ionicons name="cart-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="About"
        component={About as any}
        options={{ tabBarLabel: 'About', tabBarIcon: ({ color, size }: any) => <Ionicons name="information-circle-outline" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs as any}
        options={{ tabBarLabel: 'Contact', tabBarIcon: ({ color, size }: any) => <Ionicons name="call-outline" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
