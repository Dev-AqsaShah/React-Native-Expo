// src/screens/SignIn.tsx
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

const PRIMARY = '#002855'; // darker rich blue
const WHITE = '#FFFFFF';
const MUTED = '#64748B';

export default function SignIn() {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    navigation.replace('MainTabs');
  }

  function handleForgotPassword() {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>
      {/* Extended Blue Area */}
      <View style={styles.topArea}>
        <Animated.View
          style={[
            styles.logoWrap,
            { transform: [{ translateY }, { scale }], opacity },
          ]}
        >
          <Image
            source={require('../../assets/images/3pl dynamics-logo.jpeg')}
            style={styles.logo}
          />
        </Animated.View>

        <Text style={styles.topTitle}>{t ? t('welcome_back') : 'Welcome Back'}</Text>
        <Text style={styles.topSubtitle}>
          {t ? t('sign_in_subtitle') : 'Sign in to continue to 3PL Dynamics'}
        </Text>
      </View>

      {/* White rounded card with form */}
      <KeyboardAvoidingView
        style={styles.formWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.formCard}>
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

          <Pressable onPress={handleForgotPassword} style={styles.forgotWrap}>
            <Text style={styles.forgotText}>
              {t ? t('forgot_password') : 'Forgot password?'}
            </Text>
          </Pressable>

          <Pressable onPress={handleSignIn} style={styles.signInBtn}>
            <Text style={styles.signInText}>{t ? t('sign_in') : 'Sign In'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.createWrap}>
            <Text style={styles.createText}>
              {t
                ? t('dont_have_account', { link: t('create_account_small') })
                : "Don't have an account? Create Account"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const { height: H, width: W } = Dimensions.get('window');
const TOP_HEIGHT = Math.max(280, H * 0.42); // extended blue height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  topArea: {
    height: TOP_HEIGHT,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'flex-end', // moves content lower
    paddingHorizontal: 20,
    paddingBottom: 30, // pushes text and image down
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: Math.min(120, W * 0.28),
    height: Math.min(120, W * 0.28),
    borderRadius: 9999,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  topTitle: {
    marginTop: 10,
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  topSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },

  formWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginTop: -60,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    // shadow on all sides
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

  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotText: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: '600',
  },

  signInBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  signInText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },

  createWrap: {
    marginTop: 14,
    alignItems: 'center',
  },
  createText: {
    color: MUTED,
    fontSize: 14,
  },
  createTextBold: {
    color: PRIMARY,
    fontWeight: '700',
  },
});
