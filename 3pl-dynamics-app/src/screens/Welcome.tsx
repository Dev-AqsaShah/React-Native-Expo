// src/screens/WelcomeScreen.tsx
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
  Platform,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown'; // make sure this file exists

const PRIMARY = '#0B3B8F';
const WHITE = '#FFFFFF';

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();

  const imageY = useRef(new Animated.Value(-30)).current;
  const imageScale = useRef(new Animated.Value(0.85)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [signInHover, setSignInHover] = useState(false);
  const [createHover, setCreateHover] = useState(false);
  const [langVisible, setLangVisible] = useState(false);

  // Active button state (keeps clicked style)
  const [activeButton, setActiveButton] = useState<'signin' | 'create' | null>(null);

  // capture layout for future use (we keep states but won't pass to dropdown yet)
  const [langBtnWidth, setLangBtnWidth] = useState<number | null>(null);
  const [langBtnRightOffset, setLangBtnRightOffset] = useState<number>(32);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(imageY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [imageY, imageScale, imageOpacity]);

  const signInBg =
    activeButton === 'signin'
      ? WHITE
      : Platform.OS === 'web'
      ? signInHover
        ? WHITE
        : PRIMARY
      : PRIMARY;

  const signInTextColor =
    activeButton === 'signin'
      ? PRIMARY
      : Platform.OS === 'web'
      ? signInHover
        ? PRIMARY
        : WHITE
      : WHITE;

  const createBg =
    activeButton === 'create'
      ? PRIMARY
      : Platform.OS === 'web'
      ? createHover
        ? PRIMARY
        : WHITE
      : WHITE;

  const createTextColor =
    activeButton === 'create'
      ? WHITE
      : Platform.OS === 'web'
      ? createHover
        ? WHITE
        : PRIMARY
      : PRIMARY;

  // show language code in button
  const langLabel = (i18n?.language || 'en').toUpperCase();

  // capture layout to determine dropdown width & right offset (we store values for later)
  function onLangBtnLayout(e: LayoutChangeEvent) {
    const { width, x } = e.nativeEvent.layout;
    setLangBtnWidth(Math.round(width));
    const screenW = Dimensions.get('window').width;
    const rightOffset = Math.round(screenW - (x + width));
    setLangBtnRightOffset(rightOffset >= 0 ? rightOffset : 32);
  }

  return (
    <View style={styles.screen}>
      {/* Language button (top-right) */}
      <Pressable
        onPress={() => setLangVisible(true)}
        onLayout={onLangBtnLayout}
        style={[styles.langBtn, { zIndex: 9999, elevation: 9999 }]}
        accessibilityLabel="Open language selector"
      >
        <Text style={styles.langBtnText}>
          Choose language <Text style={styles.caret}>▼</Text>
        </Text>
      </Pressable>

      {/* Animated logo */}
      <Animated.View
        style={[
          styles.imageWrap,
          {
            transform: [{ translateY: imageY }, { scale: imageScale }],
            opacity: imageOpacity,
          },
        ]}
      >
        <Image
          source={require('../../assets/images/3pl dynamics-logo.jpeg')}
          style={styles.logo}
        />
      </Animated.View>

      {/* About text (i18n fallback included) */}
      <Text style={styles.about}>
        {t ? t('welcome_about') : 'Smart logistics for modern businesses.\nReal-time tracking, faster deliveries, and transparent operations.\nBuilt for scale — from local deliveries to national distribution.'}
      </Text>

      {/* Buttons */}
      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            setActiveButton('signin');
            navigation.navigate('SignIn');
          }}
          onHoverIn={() => Platform.OS === 'web' && setSignInHover(true)}
          onHoverOut={() => Platform.OS === 'web' && setSignInHover(false)}
          style={[
            styles.signInBtn,
            { backgroundColor: signInBg, borderColor: PRIMARY },
          ]}
        >
          <Text style={[styles.signInText, { color: signInTextColor }]}>
            {t ? t('sign_in') : 'Sign In'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setActiveButton('create');
            navigation.navigate('SignUp');
          }}
          onHoverIn={() => Platform.OS === 'web' && setCreateHover(true)}
          onHoverOut={() => Platform.OS === 'web' && setCreateHover(false)}
          style={[
            styles.createBtn,
            { backgroundColor: createBg, borderColor: PRIMARY },
          ]}
        >
          <Text style={[styles.createText, { color: createTextColor }]}>
            {t ? t('create_account') : 'Create account'}
          </Text>
        </Pressable>
      </View>

      {/* Language dropdown — for now pass only visible/onClose to avoid prop-type issues.
          Later we will update the LanguageDropdown component to accept anchorWidth/anchorRightOffset
          so the dropdown aligns with the button. */}
      <LanguageDropdown visible={langVisible} onClose={() => setLangVisible(false)} />
    </View>
  );
}

const { width: SCREEN_W } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 28,
  },
  // language button styles
  langBtn: {
    position: 'absolute',
    top: 80,
    right: 32,
    backgroundColor: '#084b98ff', // dark blue
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  langBtnText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 13,
  },
  caret: {
    fontSize: 12,
    marginLeft: 6,
    color: WHITE,
  },

  imageWrap: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Math.min(160, SCREEN_W * 0.4),
    height: Math.min(160, SCREEN_W * 0.4),
    resizeMode: 'cover',
    borderRadius: 9999, // circular
  },
  about: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4B5563',
    fontSize: 20,
    lineHeight: 22,
    maxWidth: 680,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 140,
  },
  signInBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
  },
  signInText: {
    fontSize: 18,
    fontWeight: '700',
  },
  createBtn: {
    width: '100%',
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  createText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
