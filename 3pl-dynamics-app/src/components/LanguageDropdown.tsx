// src/components/LanguageDropdown.tsx
import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  I18nManager,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../i18n'; // ensure path matches your project

type Props = {
  visible: boolean;
  onClose: () => void;
  anchorWidth?: number; // optional: width to match the button
  anchorRightOffset?: number; // optional: distance from right edge
};

const LANGS: { code: string; name: string; rtl?: boolean }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ur', name: 'اردو', rtl: true },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
];

export default function LanguageDropdown({
  visible,
  onClose,
  anchorWidth = 160,
  anchorRightOffset = 32,
}: Props) {
  const { i18n, t } = useTranslation();

  // derive selected primary code (handle en-US etc.)
  const selected = useMemo(() => (i18n?.language ? i18n.language.split(/[-_]/)[0] : 'en'), [i18n?.language]);

  // animation value (stable across renders)
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // animate when `visible` changes
  useEffect(() => {
    if (visible) {
      opacity.setValue(0);
      scale.setValue(0.95);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, stiffness: 200, damping: 18 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.95, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, opacity, scale]);

  // central language change handler (uses your i18n helper)
  const changeLang = useCallback(
    async (code: string, rtl?: boolean) => {
      try {
        // Use the central helper so language is persisted and RTL is handled consistently
        await setAppLanguage(code);
      } catch {
        // fallback to direct change if helper fails
        try {
          await i18n.changeLanguage(code);
        } catch {
          /* ignore */
        }
      }

      // On web, I18nManager may not behave the same — don't force reload here.
      if (rtl && Platform.OS !== 'web') {
        try {
          if (!I18nManager.isRTL) {
            I18nManager.forceRTL(true);
          }
        } catch {
          // no-op
        }
      } else if (Platform.OS !== 'web') {
        try {
          if (I18nManager.isRTL) {
            I18nManager.forceRTL(false);
          }
        } catch {
          // no-op
        }
      }

      onClose();
    },
    [i18n, onClose]
  );

  if (!visible) return null;

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.panel,
          {
            width: anchorWidth,
            right: anchorRightOffset,
            opacity: opacity,
            transform: [{ scale }],
          },
        ]}
      >
        {LANGS.map((l) => {
          const isSelected = selected === l.code;
          return (
            <Pressable
              key={l.code}
              onPress={() => changeLang(l.code, l.rtl)}
              style={({ pressed }) => [
                styles.item,
                isSelected ? styles.itemSelected : null,
                pressed ? styles.itemPressed : null,
              ]}
            >
              <Text style={[styles.itemText, isSelected ? styles.itemTextSelected : null]}>
                {l.name}
              </Text>
            </Pressable>
          );
        })}

        <Pressable onPress={onClose} style={styles.closeRow}>
          <Text style={styles.closeText}>{t('common.close') ?? 'Close'}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 110, // tweak if your header height changes
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  panel: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  itemPressed: {
    opacity: 0.6,
  },
  itemSelected: {
    backgroundColor: '#eaf2ff',
  },
  itemText: {
    fontSize: 15,
    color: '#0b254a',
  },
  itemTextSelected: {
    fontWeight: '700',
    color: '#002855',
  },
  closeRow: {
    marginTop: 8,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    alignItems: 'center',
  },
  closeText: {
    color: '#666',
    fontSize: 13,
  },
});
