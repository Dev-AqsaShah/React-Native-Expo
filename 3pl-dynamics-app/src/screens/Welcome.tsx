// src/screens/Welcome.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define your navigator stack params
type RootStackParamList = {
  Welcome: undefined;
  Settings: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const PRIMARY = '#0B3B8F';
const WHITE = '#FFFFFF';

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // logo animations
  const logoY = useRef(new Animated.Value(-40)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // toast animations
  const toastX = useRef(new Animated.Value(200)).current;
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // hover / layout
  const [signInHover, setSignInHover] = useState(false);
  const [createHover, setCreateHover] = useState(false);
  const [activeButton, setActiveButton] = useState<'signin' | 'create' | null>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoY, { toValue: 0, duration: 700, useNativeDriver: true, easing: Easing.out(Easing.exp) }),
      Animated.timing(logoScale, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, [logoY, logoScale, logoOpacity]);

  // show toast helper
  function showToast(message: string) {
    setToastText(message);
    setToastVisible(true);
    toastX.setValue(220);
    Animated.timing(toastX, { toValue: 0, duration: 360, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
    setTimeout(() => {
      Animated.timing(toastX, { toValue: 220, duration: 300, useNativeDriver: true }).start(() => {
        setToastVisible(false);
        setToastText('');
      });
    }, 2200);
  }

  // bottom tab press handler
  function onFakeTabPress(label: string) {
    showToast('Please login first');
  }

  const signInBg =
    activeButton === 'signin' ? WHITE : Platform.OS === 'web' ? (signInHover ? WHITE : PRIMARY) : PRIMARY;
  const signInTextColor =
    activeButton === 'signin' ? PRIMARY : Platform.OS === 'web' ? (signInHover ? PRIMARY : WHITE) : WHITE;

  const createBg =
    activeButton === 'create' ? PRIMARY : Platform.OS === 'web' ? (createHover ? PRIMARY : WHITE) : WHITE;
  const createTextColor =
    activeButton === 'create' ? WHITE : Platform.OS === 'web' ? (createHover ? WHITE : PRIMARY) : PRIMARY;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandText}>3PL Dynamics</Text>

        {/* Settings icon */}
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsBtn}
        >
          <Ionicons name="settings-outline" size={28} color={WHITE} />
        </Pressable>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* animated logo */}
        <Animated.View
          style={[
            styles.logoWrap,
            {
              transform: [{ translateY: logoY }, { scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Image source={require('../../assets/images/3pl dynamics-logo.jpeg')} style={styles.logo} />
          </View>
        </Animated.View>

        <Text style={styles.title}>Smart logistics for modern businesses</Text>
        <Text style={styles.subtitle}>
          Real-time tracking, faster deliveries, and transparent operations — built for scale.
        </Text>

        <View style={styles.actions}>
          <Pressable
            onPress={() => {
              setActiveButton('signin');
              navigation.navigate('SignIn');
            }}
            onHoverIn={() => Platform.OS === 'web' && setSignInHover(true)}
            onHoverOut={() => Platform.OS === 'web' && setSignInHover(false)}
            style={[styles.primaryBtn, { backgroundColor: signInBg }]}
          >
            <Text style={[styles.primaryBtnText, { color: signInTextColor }]}>Sign in</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setActiveButton('create');
              navigation.navigate('SignUp');
            }}
            onHoverIn={() => Platform.OS === 'web' && setCreateHover(true)}
            onHoverOut={() => Platform.OS === 'web' && setCreateHover(false)}
            style={[styles.ghostBtn, { backgroundColor: createBg }]}
          >
            <Text style={[styles.ghostBtnText, { color: createTextColor }]}>Create account</Text>
          </Pressable>
        </View>

        <View style={styles.infoRow}>
          <Feather name="shield" size={16} color="#6B7280" />
          <Text style={styles.infoText}>Trusted fulfillment • WMS-ready • Multimodal delivery</Text>
        </View>
      </View>

      {/* Bottom tabs */}
      <View style={styles.fakeTabs}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={() => onFakeTabPress('Profile')}>
          <Ionicons name="person-outline" size={22} color={WHITE} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={() => onFakeTabPress('Products')}>
          <Ionicons name="pricetags-outline" size={22} color={WHITE} />
          <Text style={styles.tabLabel}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={() => onFakeTabPress('Orders')}>
          <Ionicons name="cart-outline" size={22} color={WHITE} />
          <Text style={styles.tabLabel}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={() => onFakeTabPress('About')}>
          <Ionicons name="information-circle-outline" size={22} color={WHITE} />
          <Text style={styles.tabLabel}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={() => onFakeTabPress('Contact')}>
          <Ionicons name="call-outline" size={22} color={WHITE} />
          <Text style={styles.tabLabel}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      {toastVisible && (
        <Animated.View
          pointerEvents="none"
          style={[styles.toast, { transform: [{ translateX: toastX }] }]}
        >
          <Text style={styles.toastText}>{toastText}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: WHITE },
  header: {
    width: '100%',
    backgroundColor: PRIMARY,
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandText: { color: WHITE, fontSize: 20, fontWeight: '800' },
  settingsBtn: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  main: { flex: 1, alignItems: 'center', paddingHorizontal: 28, paddingTop: 20 },
  logoWrap: { marginTop: 6, marginBottom: 8 },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  logo: { width: 120, height: 120, borderRadius: 999, resizeMode: 'cover' },

  title: { marginTop: 14, textAlign: 'center', fontSize: 20, fontWeight: '800', color: '#0F172A' },
  subtitle: { marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 14, lineHeight: 20, maxWidth: 560 },

  actions: { width: '100%', marginTop: 26 },
  primaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '800' },

  ghostBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PRIMARY,
    backgroundColor: WHITE,
  },
  ghostBtnText: { fontSize: 16, fontWeight: '800' },

  infoRow: { marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { color: '#6B7280', marginLeft: 8 },

  fakeTabs: {
    width: '100%',
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { color: WHITE, fontSize: 11, marginTop: 4 },

  toast: {
    position: 'absolute',
    right: 12,
    bottom: Platform.OS === 'ios' ? 90 : 78,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
  },
  toastText: { color: WHITE, fontWeight: '800' },
});
