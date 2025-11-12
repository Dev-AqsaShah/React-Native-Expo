// src/components/LanguageDropdown.tsx
import React, { useMemo } from 'react';
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

  const selected = i18n?.language ?? 'en';

  // small appear animation
  const scale = useMemo(() => new Animated.Value(0.9), []);
  if (visible) {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, stiffness: 200, damping: 18 }).start();
  } else {
    Animated.timing(scale, { toValue: 0.9, duration: 120, useNativeDriver: true }).start();
  }

  if (!visible) return null;

  function changeLang(code: string, rtl?: boolean) {
    // change language
    i18n.changeLanguage(code).catch(() => { /* ignore */ });

    // if selecting an RTL language, force RTL and notify dev to restart
    if (rtl) {
      try {
        if (!I18nManager.isRTL) {
          I18nManager.forceRTL(true);
        }
      } catch (e) {
        // ignore for now
      }
      // NOTE: forcing RTL requires app reload to take effect on layout.
      // We'll close dropdown and user should restart the app manually while developing.
    } else {
      try {
        if (I18nManager.isRTL) {
          I18nManager.forceRTL(false);
        }
      } catch (e) {}
    }

    onClose();
  }

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      {/* Backdrop: close when pressed */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Dropdown positioned by right offset and width */}
      <Animated.View
        style={[
          styles.panel,
          {
            width: anchorWidth,
            right: anchorRightOffset,
            transform: [{ scale }],
          },
        ]}
      >
        {LANGS.map((l) => {
          const isSelected = selected && selected.startsWith(l.code);
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
          <Text style={styles.closeText}>{t ? t('close') ?? 'Close' : 'Close'}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 110, // enough to appear under the button at top-right; tweak if needed
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
