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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const PRIMARY = '#002855'; // dark navy (match SignIn)
const WHITE = Colors.white;
const MUTED = '#64748B';

export default function SignUpScreen({ navigation }: Props) {
  // animation for the circular logo (same as SignIn)
  const scale = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, [scale, translateY, opacity]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    // TODO: add validation/auth — for now navigate to Home
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      {/* Extended Top Blue Area */}
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

        <Text style={styles.topTitle}>Create account</Text>
        <Text style={styles.topSubtitle}>Join 3PL Dynamics to manage your logistics</Text>
      </View>

      {/* White rounded card with form (overlapping) */}
      <KeyboardAvoidingView
        style={styles.formWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.formCard}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor="#9AA3B2"
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#9AA3B2"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#9AA3B2"
            secureTextEntry
            style={styles.input}
          />

          <Pressable onPress={handleSignUp} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Create account</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('SignIn')} style={styles.createWrap}>
            <Text style={styles.createText}>
              Already have an account? <Text style={styles.createTextBold}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* layout values */
const { height: H, width: W } = Dimensions.get('window');
const TOP_HEIGHT = Math.max(280, H * 0.42); // extended like SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  /* TOP AREA (extended, content lowered) */
  topArea: {
    height: TOP_HEIGHT,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'flex-end', // move content lower
    paddingHorizontal: 20,
    paddingBottom: 30, // push logo/text lower
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: Math.min(120, W * 0.28),
    height: Math.min(120, W * 0.28),
    borderRadius: 9999, // circle
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  topTitle: {
    marginTop: 8,
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  topSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },

  /* FORM CARD (overlap + blue border + full shadow) */
  formWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginTop: -60, // overlap the extended top area
    borderWidth: 1.5,
    borderColor: PRIMARY, // blue border
    // shadow (full 4-side look)
    shadowColor: PRIMARY,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
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

  primaryBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: {
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
