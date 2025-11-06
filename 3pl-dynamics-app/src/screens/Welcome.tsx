import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PRIMARY = '#0B3B8F';
const WHITE = '#FFFFFF';

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  const imageY = useRef(new Animated.Value(-30)).current;
  const imageScale = useRef(new Animated.Value(0.85)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [signInHover, setSignInHover] = useState(false);
  const [createHover, setCreateHover] = useState(false);

  // 👇 Added state for click toggle
  const [activeButton, setActiveButton] = useState<'signin' | 'create' | null>(null);

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

  return (
    <View style={styles.screen}>
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

      {/* About text */}
      <Text style={styles.about}>
        Smart logistics for modern businesses. {'\n'}
        Real-time tracking, faster deliveries, and transparent operations. {'\n'}
        Built for scale  from local deliveries to national distribution.
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
          <Text style={[styles.signInText, { color: signInTextColor }]}>Sign In</Text>
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
            Create account
          </Text>
        </Pressable>
      </View>
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
  imageWrap: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Math.min(160, SCREEN_W * 0.4),
    height: Math.min(160, SCREEN_W * 0.4),
    resizeMode: 'cover',
    borderRadius: 9999, // 👈 makes image circular
  },
  about: {
    marginTop: 20, // 👈 reduced spacing
    textAlign: 'center',
    color: '#4B5563',
    fontSize: 20,
    lineHeight: 21,
    maxWidth: 680,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 8,
    marginTop: 140, // 👈 reduced space
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
    paddingVertical: 16,
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
