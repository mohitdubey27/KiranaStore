import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { useTheme } from '../theme';
import CustomButton from '../components/CustomButton';
import { useTranslation } from '../i18n/LanguageContext';

interface LanguageOptionProps {
  label: string;
  flag: string;
  isSelected: boolean;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
  label,
  flag,
  isSelected,
  onPress,
  theme,
}) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0.95)).current;
  const opacityAnim = useRef(new Animated.Value(isSelected ? 1 : 0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isSelected ? 1 : 0.95,
        useNativeDriver: true,
        tension: 200,
        friction: 12,
      }),
      Animated.timing(opacityAnim, {
        toValue: isSelected ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected, scaleAnim, opacityAnim]);

  const localStyles = React.useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
        },
        option: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 12,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: theme.colors.border,
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
          position: 'relative',
        },
        flag: {
          fontSize: 36,
          marginBottom: 8,
        },
        label: {
          fontSize: 16,
          fontWeight: '600',
        },
        checkmark: {
          position: 'absolute',
          top: 8,
          right: 8,
          width: 22,
          height: 22,
          borderRadius: 11,
          alignItems: 'center',
          justifyContent: 'center',
        },
        checkmarkText: {
          fontSize: 12,
          fontWeight: '800',
        },
      }),
    [theme],
  );

  return (
    <Animated.View
      style={[
        localStyles.wrapper,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          localStyles.option,
          {
            backgroundColor: isSelected
              ? theme.colors.primary
              : theme.colors.surface,
            borderColor: isSelected
              ? theme.colors.primary
              : theme.colors.border,
            shadowColor: isSelected
              ? theme.colors.primary
              : theme.colors.shadow,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={localStyles.flag}>{flag}</Text>
        <Text
          style={[
            localStyles.label,
            {
              color: isSelected
                ? theme.colors.onPrimary
                : theme.colors.textPrimary,
            },
          ]}
        >
          {label}
        </Text>
        {isSelected && (
          <View
            style={[
              localStyles.checkmark,
              { backgroundColor: theme.colors.onPrimary },
            ]}
          >
            <Text
              style={[
                localStyles.checkmarkText,
                { color: theme.colors.primary },
              ]}
            >
              ✓
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

interface StartScreenProps {
  navigation: any;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const { language, setLanguage, t } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.background,
          overflow: 'hidden',
        },
        container: { flex: 1, padding: 24, justifyContent: 'space-between' },
        header: { marginTop: 40, alignItems: 'flex-start' },
        appName: {
          color: theme.colors.textPrimary,
          fontSize: 34,
          fontWeight: '700',
          letterSpacing: 0.4,
        },
        description: {
          color: theme.colors.textMuted,
          fontSize: 16,
          marginTop: 12,
          lineHeight: 24,
        },
        languageCard: {
          width: '100%',
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          padding: 24,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 6 },
          elevation: 4,
        },
        languageTitle: {
          color: theme.colors.textPrimary,
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 18,
        },
        languageOptionsRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        },
        footer: { alignItems: 'center', paddingBottom: 20 },
        nextButton: {
          width: '100%',
          backgroundColor: theme.colors.primary,
          paddingVertical: 18,
          borderRadius: 16,
          alignItems: 'center',
        },
        nextButtonText: {
          color: theme.colors.onPrimary,
          fontSize: 18,
          fontWeight: '700',
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>Kirana Store</Text>
          <Text style={styles.description}>{t('appTagline')}</Text>
        </View>

        <View style={styles.languageCard}>
          <Text style={styles.languageTitle}>{t('chooseLanguage')}</Text>
          <View style={styles.languageOptionsRow}>
            <LanguageOption
              label={t('english')}
              flag="🇬🇧"
              isSelected={language === 'english'}
              onPress={() => setLanguage('english')}
              theme={theme}
            />
            <LanguageOption
              label={t('hindi')}
              flag="🇮🇳"
              isSelected={language === 'hindi'}
              onPress={() => setLanguage('hindi')}
              theme={theme}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <CustomButton
            title={t('next') || 'Next'}
            onPress={() => navigation.replace('LoginScreen')}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
