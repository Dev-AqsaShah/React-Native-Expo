// src/screens/SignUp.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme';

const PRIMARY = '#002855';
const WHITE = Colors.white;
const MUTED = '#64748B';

export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  // Animation refs
  const scale = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  // Avatar state
  const [avatar, setAvatar] = useState<any>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your gallery.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

 function handleSignUp() {
  // Navigate to MainTabs and select Profile tab
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'MainTabs',
        params: {
          screen: 'Profile', // make sure your Tab.Screen name is 'Profile'
        },
      },
    ],
  });
}


  const { height: H } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Area */}
      <Animated.View style={[styles.topArea, { transform: [{ translateY }, { scale }], opacity }]}>
        <Pressable onPress={pickImage} style={styles.avatarWrap}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>Upload Photo</Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.topTitle}>Create Account</Text>
        <Text style={styles.topSubtitle}>Join 3PL Dynamics to manage your logistics</Text>
      </Animated.View>

      {/* Form Card */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formWrap}>
        <View style={styles.formCard}>
          {/* Single line inputs */}
          <TextInput placeholder="Full Name" style={styles.input} />
          <TextInput placeholder="Username" style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Phone" style={styles.input} />
          <TextInput placeholder="Address" style={styles.input} />
          <TextInput placeholder="Country" style={styles.input} />
          <TextInput placeholder="Role" style={styles.input} />
          <TextInput placeholder="Company" style={styles.input} />

          <Pressable onPress={handleSignUp} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Create Account</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  topArea: {
    height: 280,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarWrap: { alignItems: 'center', marginBottom: 12 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: WHITE,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: WHITE, fontSize: 12 },
  topTitle: { color: WHITE, fontSize: 22, fontWeight: '700', textAlign: 'center' },
  topSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4, textAlign: 'center' },
  formWrap: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  formCard: {
    backgroundColor: '#f0f4ff',
    borderRadius: 16,
    padding: 20,
    shadowColor: PRIMARY,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#28456eff',
    backgroundColor: WHITE,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 15,
    color: '#020305',
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryText: { color: WHITE, fontWeight: '700', fontSize: 16 },
});
