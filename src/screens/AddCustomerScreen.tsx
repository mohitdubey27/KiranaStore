import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import BackButton from '../components/BackButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import { useTranslation } from '../i18n/LanguageContext';
import { getDeviceId } from '../utils/getDeviceId';
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from '../services/sqlite/kiranaDb';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const normalizePhone = (value: string) => value.replace(/[^0-9]/g, '');

const AddCustomerScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const theme = useTheme();
  const customerId = route.params?.customerId as string | undefined;
  const isEditing = Boolean(customerId);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        container: {
          padding: 16,
          paddingBottom: 32,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
      }),
    [theme],
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [udhaarAmount, setUdhaarAmount] = useState('');

  const [touched, setTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!customerId) return;

    getCustomerById(customerId)
      .then(customer => {
        if (!customer) return;
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setPhone(customer.phone || '');
        setUdhaarAmount(String(customer.udhaarAmount));
      })
      .catch(error => {
        console.error('[AddCustomerScreen] load customer error', error);
        Alert.alert(t('error') || 'Error', 'Failed to load customer details');
      });
  }, [customerId, t]);

  const errors = useMemo(() => {
    if (!touched) return {} as Record<string, string>;

    const first = firstName.trim();
    const last = lastName.trim();
    const normalized = normalizePhone(phone);

    const amountNumeric = Number(udhaarAmount.replace(/[^0-9.]/g, ''));

    const next: Record<string, string> = {};

    if (!first)
      next.firstName = t('pleaseEnterFirstName') || 'Enter first name';
    if (!last) next.lastName = t('pleaseEnterLastName') || 'Enter last name';

    if (!normalized) {
      next.mobileNumber = t('pleaseEnterMobileNumber') || 'Enter mobile number';
    } else if (normalized.length < 10) {
      next.mobileNumber =
        t('mobileNumberInvalid') || 'Enter a valid mobile number';
    }

    if (!udhaarAmount.trim()) {
      next.udhaarAmount = t('pleaseEnterUdhaarAmount') || 'Enter udhaar amount';
    } else if (Number.isNaN(amountNumeric) || amountNumeric < 0) {
      next.udhaarAmount = t('udhaarAmountInvalid') || 'Enter a valid amount';
    }

    return next;
  }, [firstName, lastName, phone, udhaarAmount, touched, t]);

  const hasErrors = Object.keys(errors).length > 0;

  const onSave = async () => {
    if (isSaving) return;

    setTouched(true);
    if (hasErrors) return;

    setIsSaving(true);
    try {
      const deviceId = await getDeviceId();
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: normalizePhone(phone),
        udhaarAmount: Number(udhaarAmount.replace(/[^0-9.]/g, '')),
        deviceId,
      };

      if (customerId) {
        await updateCustomer(customerId, payload);
      } else {
        await createCustomer(payload);
      }
      navigation.goBack();
    } catch (e: any) {
      console.error('[AddCustomerScreen] save error', e);
      Alert.alert(t('error') || 'Error', e?.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>
              {isEditing
                ? 'Edit Customer'
                : t('addCustomerTitle') || 'Add Customer'}
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <CustomTextInput
            title={t('firstName') || 'First name'}
            placeholder={t('enterFirstName') || 'e.g. Rajesh'}
            value={firstName}
            onChangeText={setFirstName}
            error={touched ? errors.firstName : undefined}
            autoCapitalize="words"
          />

          <CustomTextInput
            title={t('lastName') || 'Last name'}
            placeholder={t('enterLastName') || 'e.g. Kumar'}
            value={lastName}
            onChangeText={setLastName}
            error={touched ? errors.lastName : undefined}
            autoCapitalize="words"
          />

          <CustomTextInput
            title={t('mobileNumber') || 'Mobile number'}
            placeholder={t('enterMobileNumber') || 'e.g. 9876543210'}
            value={phone}
            onChangeText={setPhone}
            error={touched ? errors.mobileNumber : undefined}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            title={t('udhaarAmount') || 'Udhaar amount'}
            placeholder={t('enterUdhaarAmount') || 'e.g. 1200'}
            value={udhaarAmount}
            onChangeText={setUdhaarAmount}
            error={touched ? errors.udhaarAmount : undefined}
            keyboardType="decimal-pad"
          />

          <View style={{ marginTop: 8 }}>
            <CustomButton
              title={
                isSaving
                  ? t('pleaseWait') || 'Please wait...'
                  : isEditing
                  ? 'Update'
                  : t('save') || 'Save'
              }
              onPress={onSave}
              disabled={isSaving}
              style={{ backgroundColor: theme.colors.primary }}
            />
          </View>

          <View style={{ height: 12 }} />
        </ScrollView>
      </KeyboardAwareScrollView>
      <Loader
        visible={isSaving}
        message={t('pleaseWait') || 'Please wait...'}
      />
    </SafeAreaView>
  );
};

// styles are defined inside the component with theme tokens

export default AddCustomerScreen;
