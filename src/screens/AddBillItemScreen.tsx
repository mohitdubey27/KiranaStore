import React, { useCallback, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from '../theme';
import BackButton from '../components/BackButton';
import { useTranslation } from '../i18n/LanguageContext';
import type { KiranaStoreBrandBilingual } from '../data/kiranaStoreBrandsBilingual';
import { kiranaStoreBrandsBilingual } from '../data/kiranaStoreBrandsBilingual';
import {
  getInventoryItems,
  type InventoryItemRecord,
} from '../services/sqlite';
import { isBrandApplicableForItem } from '../utils/brandApplicability';
// Removed unused ArrowLeft import

const splitDisplayName = (displayName: string) => {
  const match = displayName.match(/^(.*)\((.*)\)\s*$/);
  if (!match) return { hi: displayName, en: displayName };
  return { hi: match[1].trim(), en: match[2].trim() };
};

const getBrandText = (
  brand: KiranaStoreBrandBilingual,
  language: any,
): string => {
  const { hi, en } = splitDisplayName(brand.displayName);
  return language === 'hindi' ? hi : en;
};

type AddBillItemRouteParams = {
  initialItemId?: string;
};

type BillItemDraft = {
  itemId: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
};

const AddBillItemScreen: React.FC = () => {
  const { t, language } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: theme.colors.background,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          flex: 1,
          textAlign: 'center',
        },
        container: {
          padding: 16,
        },
        label: {
          color: theme.colors.textMuted,
          fontWeight: '700',
          fontSize: 12,
          marginBottom: 6,
        },
        input: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        },
        valueText: {
          color: theme.colors.textPrimary,
          fontWeight: '700',
        },
        row: {
          flexDirection: 'row',
          gap: 12,
          marginTop: 12,
        },
        priceBox: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
          fontWeight: '900',
        },
        totalRow: {
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },
        totalLabel: {
          color: theme.colors.textMuted,
          fontWeight: '800',
        },
        totalValue: {
          color: theme.colors.primary,
          fontWeight: '900',
          fontSize: 18,
        },
        addBtn: {
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.primary,
          borderRadius: 14,
          paddingVertical: 14,
        },
        addBtnText: {
          color: theme.colors.onPrimary,
          fontWeight: '900',
        },
      }),
    [theme],
  );
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const params = (route.params ?? {}) as AddBillItemRouteParams;
  const { onGoBack } = params as { onGoBack: (draft: BillItemDraft) => void };
  const [items, setItems] = useState<InventoryItemRecord[]>([]);
  const [brandId, setBrandId] = useState<string>('');
  const [itemId, setItemId] = useState<string>(params.initialItemId ?? '');

  const [qtyText, setQtyText] = useState('');

  const loadItems = useCallback(async () => {
    setItems(await getInventoryItems());
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [loadItems]),
  );

  const selectedItem: InventoryItemRecord | null = useMemo(() => {
    if (!itemId) return null;
    return items.find(i => i.id === itemId) ?? null;
  }, [itemId, items]);

  const selectedBrand: KiranaStoreBrandBilingual | null = useMemo(() => {
    if (!brandId) return null;
    return kiranaStoreBrandsBilingual.find(b => b.id === brandId) ?? null;
  }, [brandId]);

  const pricePerUnit = selectedItem?.sellingPrice ?? 0;
  const unit = selectedItem?.unit ?? '';
  const shouldShowBrandField =
    !!selectedItem &&
    (isBrandApplicableForItem(selectedItem.nameHi) ||
      isBrandApplicableForItem(selectedItem.nameEn));

  const qty = useMemo(() => {
    const n = parseFloat(qtyText.replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  }, [qtyText]);

  const total = qty * pricePerUnit;

  const goSelectBrand = () => {
    navigation.navigate('SelectBrand', {
      selectedBrandId: brandId || undefined,
      onSelect: (id: string) => {
        setBrandId(id);
      },
    });
  };

  const goSelectItem = () => {
    navigation.navigate('SelectItemName', {
      selectedItemId: itemId || undefined,
      onSelect: (selectedItemId: string) => {
        setBrandId('');
        setItemId(selectedItemId);
      },
    });
  };

  const onAdd = () => {
    if (shouldShowBrandField && !brandId) {
      Alert.alert(t('error') || 'Error', 'Please select brand');
      return;
    }
    if (!selectedItem) {
      Alert.alert(t('error') || 'Error', 'Please select item');
      return;
    }
    if (!qty || qty <= 0) {
      Alert.alert(t('error') || 'Error', 'Please enter qty');
      return;
    }

    const draft: BillItemDraft = {
      itemId: selectedItem.id,
      qty,
      unit,
      pricePerUnit,
    };

    onGoBack(draft);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>{t('addItem') || 'Add Item'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <Text style={[styles.label, { marginTop: 0 }]}>
          {t('item') || 'Item'}
        </Text>
        <TouchableOpacity style={styles.input} onPress={goSelectItem}>
          <Text style={styles.valueText} numberOfLines={1}>
            {selectedItem
              ? `${selectedItem.nameHi} (${selectedItem.nameEn})`
              : t('selectItem') || 'Select item'}
          </Text>
        </TouchableOpacity>

        {shouldShowBrandField ? (
          <>
            <Text style={[styles.label, { marginTop: 12 }]}>Brand</Text>
            <TouchableOpacity style={styles.input} onPress={goSelectBrand}>
              <Text style={styles.valueText} numberOfLines={1}>
                {selectedBrand
                  ? getBrandText(selectedBrand, language)
                  : t('selectItem') || 'Select brand'}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>
              {t('qty') || 'Qty'} ({unit || ''})
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={qtyText}
              onChangeText={setQtyText}
              placeholder={'e.g. 2'}
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{t('price') || 'Price'}</Text>
            <Text style={styles.priceBox}>₹{pricePerUnit}</Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('total') || 'Total'}</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.addBtn, (!qty || qty <= 0) && { opacity: 0.6 }]}
          onPress={onAdd}
          disabled={!qty || qty <= 0}
        >
          <Text style={styles.addBtnText}>{t('addItem') || 'Add'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// styles are defined inside the component using theme tokens

export default AddBillItemScreen;
