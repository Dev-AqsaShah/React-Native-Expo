// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// screens
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import Orders from '../screens/Order';
import About from '../screens/About';
import ContactUs from '../screens/Contact';

// Define type for tabs
export type MainTabParamList = {
  Profile: undefined;
  Products: undefined;
  Orders: undefined;
  About: undefined;
  ContactUs: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const TAB_BAR_BG = '#0a2b6a'; // dark blue
  const ICON_COLOR = '#FFFFFF'; // white

  const navigatorOptions = {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: ICON_COLOR,
    tabBarInactiveTintColor: ICON_COLOR,
    tabBarStyle: {
      backgroundColor: TAB_BAR_BG,
      borderTopWidth: 0,
      height: Platform.OS === 'ios' ? 80 : 60,
      paddingBottom: Platform.OS === 'ios' ? 20 : 6,
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: -2 },
      shadowRadius: 6,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500',
    },
  };

  const renderIcon =
    (name: React.ComponentProps<typeof Ionicons>['name']) =>
    ({ focused, size }: { focused: boolean; size: number }) => (
      <Ionicons name={name} size={size} color={ICON_COLOR} />
    );

  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={navigatorOptions}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderIcon('person-outline'),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: renderIcon('pricetags-outline'),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: renderIcon('cart-outline'),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: renderIcon('information-circle-outline'),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: renderIcon('call-outline'),
        }}
      />
    </Tab.Navigator>
  );
}
