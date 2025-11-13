// src/navigation/MainTabs.tsx
import React, { JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// screens (make sure these exist)
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import Orders from '../screens/Order';
import About from '../screens/About';
import ContactUs from '../screens/Contact';

const Tab: any = createBottomTabNavigator();

export default function MainTabs(): JSX.Element {
  // common tab bar style
  const TAB_BAR_BG = '#0a2b6a'; // dark blue (change if you want a different shade)
  const ICON_COLOR = '#FFFFFF'; // white for icons/labels

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
      // ensure it is not transparent or behind something
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

  // helper to render icons (we explicitly set color to ensure it's white)
  const renderIcon =
    (name: React.ComponentProps<typeof Ionicons>['name']) =>
    ({ focused, size }: { focused: boolean; size: number }) => {
      // explicitly set white color (ignores any unexpected tinting)
      return <Ionicons name={name} size={size} color={ICON_COLOR} />;
    };

  return (
    <Tab.Navigator initialRouteName="Products" screenOptions={navigatorOptions}>
      <Tab.Screen
        name="Profile"
        component={Profile as any}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderIcon('person-outline'),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products as any}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: renderIcon('pricetags-outline'),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders as any}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: renderIcon('cart-outline'),
        }}
      />
      <Tab.Screen
        name="About"
        component={About as any}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: renderIcon('information-circle-outline'),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs as any}
        options={{
          tabBarLabel: 'Contact Us',
          tabBarIcon: renderIcon('call-outline'),
        }}
      />
    </Tab.Navigator>
  );
}
