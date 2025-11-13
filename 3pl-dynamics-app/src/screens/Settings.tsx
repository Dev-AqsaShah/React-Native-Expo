// src/screens/Settings.tsx
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
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

// Define your languages here
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
  const selected = i18n.language || 'en';

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const scaleAnim = useMemo(() => new Animated.Value(0.95), []);

  // Animate dropdown
  if (dropdownVisible) {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, stiffness: 200, damping: 18 }).start();
  } else {
    Animated.timing(scaleAnim, { toValue: 0.95, duration: 120, useNativeDriver: true }).start();
  }

  function changeLanguage(code: string, rtl?: boolean) {
    i18n.changeLanguage(code).catch(() => {});
    if (rtl) {
      try {
        if (!I18nManager.isRTL) I18nManager.forceRTL(true);
      } catch {}
    } else {
      try {
        if (I18nManager.isRTL) I18nManager.forceRTL(false);
      } catch {}
    }
    setDropdownVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings') || 'Settings'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>{t('language') || 'Language'}</Text>

        <Pressable
          style={styles.languageBtn}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.languageBtnText}>
            {LANGS.find(l => selected.startsWith(l.code))?.flag}{' '}
            {LANGS.find(l => selected.startsWith(l.code))?.name}
          </Text>
          <Ionicons name={dropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#0B3B8F" />
        </Pressable>

        {dropdownVisible && (
          <Animated.View style={[styles.dropdown, { transform: [{ scale: scaleAnim }] }]}>
            {LANGS.map((lang) => (
              <Pressable
                key={lang.code}
                style={[
                  styles.dropdownItem,
                  selected.startsWith(lang.code) ? styles.dropdownItemSelected : null,
                ]}
                onPress={() => changeLanguage(lang.code, lang.rtl)}
              >
                <Text style={styles.dropdownItemText}>
                  {lang.flag} {lang.name}
                </Text>
                {selected.startsWith(lang.code) && (
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0B3B8F',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  container: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#0F172A' },
  languageBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
