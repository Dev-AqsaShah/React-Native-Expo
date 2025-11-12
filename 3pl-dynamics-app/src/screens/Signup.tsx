// src/screens/SignUp.tsx
import { useRef, useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const PRIMARY = '#002855'; 
const WHITE = '#FFFFFF';
const MUTED = '#64748B';

export default function SignUp() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  // Animation for logo
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    // ✅ Navigate to MainTabs after signup
    navigation.replace('MainTabs');
  }

  return (
    <View style={styles.container}>
      {/* Top blue area */}
      <View style={styles.topArea}>
        <Animated.View style={[styles.logoWrap, { transform: [{ translateY }, { scale }], opacity }]}>
          <Image
            source={require('../../assets/images/3pl dynamics-logo.jpeg')}
            style={styles.logo}
          />
        </Animated.View>
        <Text style={styles.topTitle}>{t ? t('create_account') : 'Create Account'}</Text>
        <Text style={styles.topSubtitle}>
          {t ? t('signup_subtitle') : 'Sign up to get started with 3PL Dynamics'}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.formWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.formCard}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t ? t('full_name') : 'Full Name'}
            placeholderTextColor="#9AA3B2"
            style={styles.input}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={t ? t('email') : 'Email'}
            placeholderTextColor="#9AA3B2"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={t ? t('password') : 'Password'}
            placeholderTextColor="#9AA3B2"
            secureTextEntry
            style={styles.input}
          />

          <Pressable onPress={handleSignUp} style={styles.signUpBtn}>
            <Text style={styles.signUpText}>{t ? t('create_account') : 'Create Account'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('SignIn')} style={styles.signInWrap}>
            <Text style={styles.signInText}>
              {t ? t('already_have_account', { link: t('sign_in_small') }) : 'Already have an account? Sign In'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const { height: H, width: W } = Dimensions.get('window');
const TOP_HEIGHT = Math.max(280, H * 0.42);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  topArea: {
    height: TOP_HEIGHT,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logo: {
    width: Math.min(120, W * 0.28),
    height: Math.min(120, W * 0.28),
    borderRadius: 9999,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  topTitle: { marginTop: 10, color: WHITE, fontSize: 22, fontWeight: '700', textAlign: 'center' },
  topSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 20, textAlign: 'center' },

  formWrap: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginTop: -60,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#28456eff',
    backgroundColor: '#eaf0fbff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
    color: '#020305ff',
  },

  signUpBtn: { backgroundColor: PRIMARY, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  signUpText: { color: WHITE, fontWeight: '700', fontSize: 16 },

  signInWrap: { marginTop: 14, alignItems: 'center' },
  signInText: { color: MUTED, fontSize: 14 },
});
