// src/screens/Home.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const { width: W } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  // subtle entrance animation for the avatar
  const scale = useRef(new Animated.Value(0.85)).current;
  const y = useRef(new Animated.Value(-8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, [scale, y, opacity]);

  return (
    <View style={styles.container}>
      {/* Top avatar + greeting */}
      <Animated.View style={[styles.avatarWrap, { transform: [{ translateY: y }, { scale }], opacity }]}>
        <Image
          source={require('../../assets/images/3pl dynamics-logo.jpeg')}
          style={styles.avatar}
        />
      </Animated.View>

      <Text style={styles.hello}>{t ? t('hello') : 'Hello,'}</Text>
      <Text style={styles.name}>{t ? t('welcome_dashboard') : 'Welcome to 3PL Dynamics'}</Text>

      {/* Dashboard card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t ? t('overview') : 'Overview'}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>{t ? t('orders') : 'Orders'}</Text>
          </View>

          <View style={[styles.statBox, { marginLeft: 12 }]}>
            <Text style={styles.statValue}>43</Text>
            <Text style={styles.statLabel}>{t ? t('deliveries') : 'Deliveries'}</Text>
          </View>
        </View>

        <Text style={styles.cardNote}>
          {t ? t('dashboard_note') : 'Track shipments, review performance, and manage routes — all in one place.'}
        </Text>

        <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.primaryBtnText}>{t ? t('go_to_dashboard') : 'Go to Dashboard'}</Text>
        </Pressable>
      </View>

      {/* Sign out (smaller) */}
      <Pressable style={styles.signOut} onPress={() => navigation.replace('Welcome')}>
        <Text style={styles.signOutText}>{t ? t('sign_out') : 'Sign out'}</Text>
      </Pressable>
    </View>
  );
}

const AV = Math.min(120, W * 0.28);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 36,
  },
  avatarWrap: {
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AV,
    height: AV,
    borderRadius: 9999,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  hello: {
    marginTop: 14,
    fontSize: 16,
    color: Colors.muted ?? '#64748B',
  },
  name: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text ?? '#0F172A',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    marginTop: 18,
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    marginTop: 6,
    color: '#6B7280',
  },
  cardNote: {
    marginTop: 14,
    color: '#475569',
    fontSize: 13,
    lineHeight: 18,
  },
  primaryBtn: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.white,
    fontWeight: '700',
  },

  signOut: {
    marginTop: 18,
  },
  signOutText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
