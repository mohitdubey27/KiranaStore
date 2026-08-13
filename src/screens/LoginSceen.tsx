import React, { useState } from 'react';

import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, type NavigationProp } from '@react-navigation/native';

import { clearLogin, saveLogin } from '../services/sqlite/kiranaDb';
import { useTheme } from '../theme';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import Loader from '../components/Loader';
import type { RootStackParamList } from '../types/navigation';
import { useTranslation } from '../i18n/LanguageContext';
import { getDeviceId } from '../utils/getDeviceId';

const LoginSceen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { width } = Dimensions.get('window');
  const { t } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        },
        background: {
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        topBlob: {
          position: 'absolute',
          top: -80,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: theme.colors.primary,
          opacity: 0.12,
        },
        bottomBlob: {
          position: 'absolute',
          right: -100,
          bottom: -100,
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: theme.colors.primaryVariant,
          opacity: 0.08,
        },
        card: {
          width: '100%',
          maxWidth: 420,
          backgroundColor: 'rgba(255,255,255,0.98)',
          borderRadius: 14,
          padding: 24,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 18,
          elevation: 4,
        },
        logo: {
          width: 68,
          height: 68,
          borderRadius: 34,
          backgroundColor: theme.colors.primary,
          marginBottom: 12,
          shadowColor: theme.colors.primary,
          shadowOpacity: 0.22,
          shadowRadius: 8,
          elevation: 3,
          justifyContent: 'center',
          alignItems: 'center',
        },
        logoText: {
          color: theme.colors.onPrimary,
          fontSize: 24,
          fontWeight: '800',
          letterSpacing: 0.6,
        },
        welcome: {
          fontSize: 20,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        subtitle: {
          fontSize: 13,
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginBottom: 16,
        },
        header: { alignItems: 'center', marginBottom: 16 },
        button: {
          marginTop: 18,
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
        },
        clearButton: { marginTop: 10, alignItems: 'center' },
      }),
    [theme],
  );

  // Using onSubmitEditing to move focus; no need for explicit refs.

  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [errors, setErrors] = useState<{ name?: string; shopName?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const trimmedName = name.trim();
    const trimmedShop = shopName.trim();

    const nextErrors: { name?: string; shopName?: string } = {};

    if (!trimmedName) nextErrors.name = t('pleaseEnterYourName');
    if (!trimmedShop) nextErrors.shopName = t('pleaseEnterYourShopName');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onLogin = async () => {
    if (isLoading) return;

    const ok = validate();
    if (!ok) return;

    try {
      setIsLoading(true);
      const trimmedName = name.trim();
      const trimmedShop = shopName.trim();
      const deviceId = await getDeviceId();

      await saveLogin({
        name: trimmedName,
        shopName: trimmedShop,
        deviceId: deviceId as unknown as string,
      });
      Alert.alert(t('success'), t('loggedInSuccessfully'));

      navigation.navigate('HomeScreen');
    } catch {
      Alert.alert(t('error'), t('failedToSaveLogin'));
    } finally {
      setIsLoading(false);
    }
  };

  const clearSaved = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await clearLogin();
      setName('');
      setShopName('');
      setErrors({});
      Alert.alert(t('cleared'), t('savedLoginRemoved'));
    } catch {
      Alert.alert(t('error'), t('failedToClear'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
    >
      <View style={styles.background} pointerEvents="none">
        <View style={styles.topBlob} />
        <View style={styles.bottomBlob} />
      </View>

      <Loader visible={isLoading} message={t('pleaseWait')} />

      <View style={[styles.card, { width: Math.min(420, width - 32) }]}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>KS</Text>
          </View>
          <Text style={styles.welcome}>{t('welcome')}</Text>
          <Text style={styles.subtitle}>{t('accessDashboard')}</Text>
        </View>

        <CustomTextInput
          title={t('yourName')}
          placeholder={t('namePlaceholder')}
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoCapitalize="words"
          testID="nameInput"
          returnKeyType="next"
        />

        <CustomTextInput
          title={t('shopName')}
          placeholder={t('shopPlaceholder')}
          value={shopName}
          onChangeText={setShopName}
          error={errors.shopName}
          autoCapitalize="words"
          testID="shopInput"
          returnKeyType="done"
          onSubmitEditing={onLogin}
        />

        <CustomButton
          title={isLoading ? t('loggingIn') : t('continue')}
          onPress={onLogin}
          testID="loginButton"
          style={styles.button}
          backgroundColor={theme.colors.primary}
          disabled={isLoading}
        />

        <CustomButton
          title={t('clearSaved')}
          onPress={clearSaved}
          testID="clearButton"
          style={styles.clearButton}
          backgroundColor="transparent"
          textColor={theme.colors.textMuted}
          disabled={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

// styles are created with React.useMemo above to be theme-aware

export default LoginSceen;
