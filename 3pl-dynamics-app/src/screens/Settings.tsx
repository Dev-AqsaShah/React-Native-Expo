import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  I18nManager,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppStack';
import { setAppLanguage } from '../i18n'; // import setAppLanguage

type SettingsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const LANGS: { code: string; name: string; flag: string; rtl?: boolean }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default function SettingsScreen() {
  const { i18n, t } = useTranslation();
  const navigation = useNavigation<SettingsScreenProp>();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const scaleAnim = useMemo(() => new Animated.Value(0.95), []);

  // Animate dropdown
  Animated.spring(scaleAnim, {
    toValue: dropdownVisible ? 1 : 0.95,
    useNativeDriver: true,
    stiffness: 200,
    damping: 18,
  }).start();

  // Change language with AsyncStorage + RTL
  const changeLanguage = async (code: string, rtl?: boolean) => {
    try {
      await setAppLanguage(code); // this updates i18n + AsyncStorage + RTL handling
      setSelectedLang(code);       // update state to re-render UI

      // Optional alert if RTL layout changed
      const isRTL = rtl ?? false;
      if ((isRTL && !I18nManager.isRTL) || (!isRTL && I18nManager.isRTL)) {
        Alert.alert(
          t('common.language_changed_title') || 'Language Changed',
          t('common.language_changed_restart') || 'Restart app to apply layout changes.',
          [{ text: t('common.ok') || 'OK' }]
        );
      }
    } catch (err) {
      console.warn('Language change failed', err);
    } finally {
      setDropdownVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>{t('settings') || 'Settings'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>{t('language') || 'Language'}</Text>

        <Pressable
          style={styles.languageBtn}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.languageBtnText}>
            {LANGS.find(l => selectedLang.startsWith(l.code))?.flag}{' '}
            {LANGS.find(l => selectedLang.startsWith(l.code))?.name}
          </Text>
          <Ionicons
            name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#0B3B8F"
          />
        </Pressable>

        {dropdownVisible && (
          <Animated.View style={[styles.dropdown, { transform: [{ scale: scaleAnim }] }]}>
            {LANGS.map(lang => (
              <Pressable
                key={lang.code}
                style={[
                  styles.dropdownItem,
                  selectedLang.startsWith(lang.code) ? styles.dropdownItemSelected : null,
                ]}
                onPress={() => changeLanguage(lang.code, lang.rtl)}
              >
                <Text style={styles.dropdownItemText}>
                  {lang.flag} {lang.name}
                </Text>
                {selectedLang.startsWith(lang.code) && (
                  <Ionicons name="checkmark" size={20} color="#0B3B8F" />
                )}
              </Pressable>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0B3B8F',
  },
  backBtn: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  container: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#0F172A' },
  languageBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  languageBtnText: { fontSize: 16, fontWeight: '600', color: '#0B3B8F' },
  dropdown: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownItemSelected: { backgroundColor: '#eaf2ff' },
  dropdownItemText: { fontSize: 16, color: '#0B3B8F' },
});
