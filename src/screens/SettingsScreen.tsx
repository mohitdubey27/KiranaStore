import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Store, Globe2, LogOut, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import type { RootStackParamList } from '../types/navigation';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t, language, setLanguage } = useTranslation();

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.background },
        headerCard: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        },
        backButton: {
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        body: { flex: 1 },
        bodyContent: { paddingHorizontal: 16, paddingBottom: 32 },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
          paddingVertical: 8,
          overflow: 'hidden',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 18,
          elevation: 3,
        },
        itemRow: {
          paddingVertical: 18,
          paddingHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
        },
        iconWrapper: {
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: 'rgba(107, 92, 255, 0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        },
        textBlock: { flex: 1 },
        itemLabel: {
          fontSize: 15,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        itemSubtitle: {
          marginTop: 4,
          fontSize: 13,
          color: theme.colors.textMuted,
        },
        rightBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        rightText: {
          fontSize: 14,
          color: theme.colors.textPrimary,
          fontWeight: '600',
        },
        divider: {
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 0,
          height: 1,
          backgroundColor: theme.colors.background,
        },
        logoutButton: {
          marginTop: 20,
          paddingVertical: 18,
          paddingHorizontal: 18,
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.04,
          shadowRadius: 12,
          elevation: 2,
        },
        iconWrapperLogout: {
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        },
        logoutText: {
          fontSize: 15,
          color: theme.colors.danger,
          fontWeight: '700',
        },
      }),
    [theme],
  );

  const languageLabel = language === 'english' ? t('english') : t('hindi');

  const isHindi = language === 'hindi';

  const listItems = [
    {
      key: 'storeInfo',
      icon: <Store size={20} color={theme.colors.primary} />,
      label: t('storeInformation'),
      subtitle: t('storeInformationSubtitle'),
      onPress: () => {},
    },
    {
      key: 'language',
      icon: <Globe2 size={20} color={theme.colors.primary} />,
      label: t('language'),
      rightText: languageLabel,
      onPress: () => {
        setLanguage(isHindi ? 'english' : 'hindi');
      },
      isSwitch: true,
      switchValue: isHindi,
      switchOnChange: (val: boolean) => {
        setLanguage(val ? 'hindi' : 'english');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {listItems.map((item: any, index: number) => (
            <View key={item.key}>
              <TouchableOpacity
                style={styles.itemRow}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.iconWrapper}>
                  {React.cloneElement(item.icon, {
                    color: theme.colors.primary,
                  })}
                </View>
                <View style={styles.textBlock}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {item.subtitle ? (
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  ) : null}
                </View>

                <View style={styles.rightBlock}>
                  {item.rightText ? (
                    <Text style={styles.rightText}>{item.rightText}</Text>
                  ) : null}

                  {item.isSwitch ? (
                    <Switch
                      value={item.switchValue}
                      onValueChange={item.switchOnChange}
                      trackColor={{
                        false: theme.colors.border,
                        true: theme.colors.primary,
                      }}
                      thumbColor={theme.colors.surface}
                    />
                  ) : (
                    <ChevronRight size={20} color={theme.colors.textMuted} />
                  )}
                </View>
              </TouchableOpacity>

              {index !== listItems.length - 1 ? (
                <View style={styles.divider} />
              ) : null}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <View style={styles.iconWrapperLogout}>
            <LogOut size={20} color={theme.colors.danger} />
          </View>
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// styles are created with React.useMemo above to be theme-aware

export default SettingsScreen;
