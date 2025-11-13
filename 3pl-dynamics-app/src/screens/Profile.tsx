// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

type ProfileNavProp = NativeStackNavigationProp<RootStackParamList>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavProp>();

  // Dummy user data
  const user = {
    name: 'Aqsa Shah',
    username: 'aqsashah11',
    email: 'aqsashah000000@gmail.com',
    role: 'Intern',
    company: '3PL Dynamics',
    phone: '+92 300 1234567',
    address: '123, Main Street, Karachi, Pakistan',
    city: 'Karachi',
    country: 'Pakistan',
    avatar: require('../../assets/images/profile.jpeg'),
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Top Blue Header */}
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.role}>{user.role}</Text>
        <Text style={styles.company}>{user.company}</Text>

        <Pressable style={styles.editButton} onPress={() => console.log('Edit profile')}>
          <Feather name="edit" size={20} color={Colors.white} />
        </Pressable>
      </Animated.View>

      {/* Info Section */}
      <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="mail" size={18} color={Colors.primary} />
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={18} color={Colors.primary} />
          <Text style={styles.info}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={18} color={Colors.primary} />
          <Text style={styles.info}>{user.address}, {user.city}, {user.country}</Text>
        </View>
      </Animated.View>

      {/* Sign Out */}
      <Pressable
        style={({ pressed }) => [
          styles.signOut,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => navigation.replace('Welcome')}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // main screen background
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-end', // push content slightly down
    height: SCREEN_HEIGHT * 0.45, // bigger header
    backgroundColor: '#1B2A49',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#F0F0F0',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    color: '#B0C4DE',
    marginBottom: 2,
  },
  role: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: 2,
  },
  company: {
    fontSize: 16,
    color: Colors.white,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 999,
  },
  infoCard: {
    marginHorizontal: 20,
    backgroundColor: '#1B2A49', // dark blue to match header
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  info: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  signOut: {
    alignSelf: 'center',
    backgroundColor: '#FF4C4C',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
  },
  signOutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
