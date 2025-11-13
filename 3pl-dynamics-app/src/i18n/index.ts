// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager, Alert, Platform } from 'react-native';

// locale JSONs (ensure these exist under src/i18n/locales/)
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import ur from './locales/ur.json';
import ru from './locales/ru.json';
import pt from './locales/pt.json';

/**
 * Key used to persist user's language choice in AsyncStorage
 */
export const LANGUAGE_KEY = 'user-language-v1';

/**
 * Supported languages map (code -> human label)
 * Keep this in sync with the locale JSON files you include above.
 */
export const supportedLanguages: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ar: 'العربية',
  hi: 'हिन्दी',
  ur: 'اردو',
  ru: 'Русский',
  pt: 'Português',
};

/**
 * Resources object for i18next
 */
const resources: Record<string, { translation: unknown }> = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
  ar: { translation: ar },
  hi: { translation: hi },
  ur: { translation: ur },
  ru: { translation: ru },
  pt: { translation: pt },
};

/**
 * Detect device language safely and return a supported language code if available.
 */
function detectDeviceLanguage(): string {
  try {
    const locales = Localization.getLocales();
    if (Array.isArray(locales) && locales.length > 0) {
      const raw = (locales[0].languageTag || locales[0].languageCode || 'en').toLowerCase();
      // raw might be 'en-US' or 'zh-Hans'; prefer primary subtag
      const primary = raw.split(/[-_]/)[0];
      if (Object.prototype.hasOwnProperty.call(resources, primary)) return primary;
      if (Object.prototype.hasOwnProperty.call(resources, raw)) return raw;
    }
  } catch {
    // ignore and fall back
  }
  return 'en';
}

/**
 * Initialize i18next. Call this once early in App (e.g. App.tsx).
 */
export async function initI18n(): Promise<void> {
  if (i18n.isInitialized) return;

  const deviceLang = detectDeviceLanguage();

  i18n.use(initReactI18next);

  try {
    await i18n.init({
      resources,
      lng: deviceLang,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      compatibilityJSON: 'v4',
      react: { useSuspense: false },
    });
  } catch (err) {
    // initialization failed — keep app running with default english
    // console.warn('i18n init failed', err);
  }

  // apply stored language if exists
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored && stored !== i18n.language) {
      await i18n.changeLanguage(stored);
    }
  } catch {
    // ignore storage errors
  }
}

/**
 * Returns current active language code
 */
export function getCurrentLanguage(): string {
  return i18n.language || detectDeviceLanguage() || 'en';
}

/**
 * Change application language and persist preference.
 * Handles RTL toggling (for 'ar' and 'ur') and notifies user to restart if layout direction changed.
 */
export async function setAppLanguage(lang: string): Promise<void> {
  try {
    if (!lang || !Object.prototype.hasOwnProperty.call(resources, lang)) {
      // invalid language requested
      return;
    }

    // no-op if same language
    if (i18n.language === lang) {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang).catch(() => {});
      return;
    }

    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);

    // manage RTL for certain languages
    const rtlLanguages = ['ar', 'ur'];
    const shouldBeRTL = rtlLanguages.includes(lang);
    if (I18nManager.isRTL !== shouldBeRTL) {
      try {
        I18nManager.forceRTL(shouldBeRTL);
      } catch {
        // platform might not allow forcing RTL in all environments
      }

      // friendly alert — changing layout direction requires app restart to take full effect
      const title = i18n.t('common.language_changed_title') || 'Language changed';
      const message =
        i18n.t('common.language_changed_restart') ||
        'Please restart the app to apply layout direction changes.';

      Alert.alert(title, message, [
        {
          text: i18n.t('common.ok') || 'OK',
          style: 'default',
        },
      ]);
    }
  } catch (err) {
    // swallow errors quietly — app should not crash on i18n issues
    // console.warn('setAppLanguage error', err);
  }
}

/**
 * Loads stored language if exists (useful when you want to ensure stored value is applied).
 */
export async function loadStoredLanguage(): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored && stored !== i18n.language) {
      await i18n.changeLanguage(stored);
    }
  } catch {
    // ignore
  }
}

export default i18n;
