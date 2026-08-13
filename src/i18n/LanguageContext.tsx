import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Language, TranslationKey } from './strings';
import { STRINGS } from './strings';

let AsyncStorage: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  AsyncStorage = null;
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isLanguageLoaded: boolean;
  isLanguageSaved: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = 'kiranaStore.language';

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>('english');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [isLanguageSaved, setIsLanguageSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!AsyncStorage) {
        setIsLanguageLoaded(true);
        return;
      }
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'english' || saved === 'hindi') {
          setLanguageState(saved);
          setIsLanguageSaved(true);
        }
      } catch {
        // ignore
      } finally {
        setIsLanguageLoaded(true);
      }
    };
    load();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (!AsyncStorage) {
      setIsLanguageSaved(true);
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, lang)
      .then(() => {
        setIsLanguageSaved(true);
      })
      .catch(() => {
        // ignore
      });
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => STRINGS[language][key],
      isLanguageLoaded,
      isLanguageSaved,
    }),
    [language, isLanguageLoaded, isLanguageSaved],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return ctx;
};
