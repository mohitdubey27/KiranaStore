import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import BackButton from '../components/BackButton';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../i18n/LanguageContext';
import { kiranaStoreItemsBilingual } from '../data/kiranaStoreItemsBilingual';
import { kiranaStoreBrandsBilingual } from '../data/kiranaStoreBrandsBilingual';

const categoryKeys = ['grocery', 'beverages', 'snacks', 'household'] as const;

const units = ['kg', 'g', 'L', 'ml', 'pcs'];

const AddItemScreen: React.FC = () => {
  const { t, language } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        headerRow: {
          padding: 12,
          alignItems: 'center',
          borderBottomWidth: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.background,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        container: { padding: 16 },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          padding: 16,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 6,
        },
        label: {
          color: theme.colors.textMuted,
          marginBottom: 6,
          marginTop: 12,
        },
        input: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: 12,
          backgroundColor: theme.colors.surface,
        },
        pickerRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
        chip: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 999,
          backgroundColor: theme.colors.background,
          marginRight: 8,
          marginBottom: 8,
        },
        chipActive: { backgroundColor: theme.colors.primary },
        chipText: { color: theme.colors.textPrimary, fontWeight: '700' },
        chipTextActive: { color: theme.colors.onPrimary },
        rowTwo: { flexDirection: 'row', gap: 12, marginTop: 8 },
        col: { flex: 1 },
        saveBtn: {
          marginTop: 20,
          backgroundColor: theme.colors.primary,
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
        },
        saveText: { color: theme.colors.onPrimary, fontWeight: '800' },
      }),
    [theme],
  );
  const nav = useNavigation<any>();
  const [brandId, setBrandId] = useState('');
  const [name, setName] = useState('');

  const [categoryKey, setCategoryKey] = useState<(typeof categoryKeys)[number]>(
    categoryKeys[0],
  );

  const [unit, setUnit] = useState(units[0]);

  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [initialStock, setInitialStock] = useState('');
  const [minStock, setMinStock] = useState('');

  const save = () => {
    // basic validation
    if (!name.trim()) {
      Alert.alert(
        t('error') || 'Error',
        t('pleaseEnterItemName') || 'Please enter item name',
      );
      return;
    }
    // Here you would persist the item to DB / state
    Alert.alert(
      t('success') || 'Success',
      `${name} ${t('itemSaved') || 'saved successfully'}`,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.headerRow}>
        <BackButton onPress={() => nav.goBack()} />
        <Text style={styles.headerTitle}>{t('addItem') || 'Add Item'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.label}>{'Brand'}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              nav.navigate('SelectBrand', {
                selectedBrandId: brandId || undefined,
                onSelect: (id: string) => {
                  setBrandId(id);
                },
              });
            }}
          >
            <Text
              style={{ color: theme.colors.textPrimary, fontWeight: '700' }}
            >
              {brandId
                ? kiranaStoreBrandsBilingual.find(b => b.id === brandId)
                    ?.displayName
                : t('selectItem') || 'Select brand'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>{t('itemName') || 'Item name'}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              nav.navigate('SelectItemName', {
                selectedItemId: name || undefined,
                onSelect: (itemId: string) => {
                  const display =
                    kiranaStoreItemsBilingual.find(i => i.id === itemId)
                      ?.displayName || '';
                  const match = display.match(/^(.*)\((.*)\)\s*$/);
                  const hi = match?.[1]?.trim() || '';
                  const en = match?.[2]?.trim() || '';
                  setName(language === 'hindi' ? hi : en);
                },
              });
            }}
          >
            <Text
              style={{ color: theme.colors.textPrimary, fontWeight: '700' }}
            >
              {name || t('selectItem') || 'Select item'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>{t('categoryLabel') || 'Category'}</Text>
          <View style={styles.pickerRow}>
            {categoryKeys.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.chip, categoryKey === c && styles.chipActive]}
                onPress={() => setCategoryKey(c)}
              >
                <Text
                  style={[
                    styles.chipText,
                    categoryKey === c && styles.chipTextActive,
                  ]}
                >
                  {t(c as any) || c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('unitLabel') || 'Unit'}</Text>
          <View style={styles.pickerRow}>
            {units.map(u => (
              <TouchableOpacity
                key={u}
                style={[styles.chip, unit === u && styles.chipActive]}
                onPress={() => setUnit(u)}
              >
                <Text
                  style={[styles.chipText, unit === u && styles.chipTextActive]}
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rowTwo}>
            <View style={styles.col}>
              <Text style={styles.label}>{`${
                t('purchasePrice') || 'Purchase Price'
              } (₹)`}</Text>
              <TextInput
                style={styles.input}
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                keyboardType="numeric"
                placeholder={t('pricePlaceholder') || 'e.g. 40'}
                placeholderTextColor={theme.colors.textMuted}
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>{`${
                t('sellingPrice') || 'Selling Price'
              } (₹)`}</Text>
              <TextInput
                style={styles.input}
                value={sellingPrice}
                onChangeText={setSellingPrice}
                keyboardType="numeric"
                placeholder={t('pricePlaceholder') || 'e.g. 45'}
                placeholderTextColor={theme.colors.textMuted}
              />
            </View>
          </View>

          <Text style={styles.label}>
            {t('initialStock') || 'Initial Stock'}
          </Text>
          <TextInput
            style={styles.input}
            value={initialStock}
            onChangeText={setInitialStock}
            keyboardType="numeric"
            placeholder={t('initialStockPlaceholder') || 'e.g. 50'}
            placeholderTextColor={theme.colors.textMuted}
          />

          <Text style={styles.label}>
            {t('minimumStockAlert') || 'Minimum Stock Alert'}
          </Text>
          <TextInput
            style={styles.input}
            value={minStock}
            onChangeText={setMinStock}
            keyboardType="numeric"
            placeholder={t('minStockPlaceholder') || 'e.g. 5'}
            placeholderTextColor={theme.colors.textMuted}
          />

          <CustomButton
            title={t('save') || 'Save'}
            onPress={save}
            style={styles.saveBtn}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// styles are defined inside the component using theme tokens

export default AddItemScreen;
