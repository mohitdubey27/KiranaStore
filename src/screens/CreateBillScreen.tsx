import React, { useMemo, useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  ChevronLeft,
  Search,
  Plus,
  Trash2,
  CreditCard,
} from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import type { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { inventoryItems } from '../data/inventoryItems';

type BillLine = {
  lineId: string;
  itemId: string;
  itemNameHi: string;
  itemNameEn: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
  total: number;
};

const CreateBillScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [search, setSearch] = useState('');

  const [lines, setLines] = useState<BillLine[]>([]);

  const totals = useMemo(() => {
    const totalItems = lines.length;
    const totalAmount = lines.reduce((sum, l) => sum + l.total, 0);
    const discount = 0;
    const amountDue = totalAmount - discount;
    return { totalItems, totalAmount, discount, amountDue };
  }, [lines]);

  const openAddScreen = () => {
    navigation.navigate('AddBillItem', {
      onGoBack: handleAddBillItem,
    });
  };

  // Add line when coming from AddBillItemScreen
  const handleAddBillItem = (
    billItemDraft:
      | {
          itemId: string;
          qty: number;
          unit: string;
          pricePerUnit: number;
        }
      | undefined,
  ) => {
    console.log('handleAddBillItem called with:', billItemDraft);
    if (!billItemDraft) return;

    const { itemId, qty, unit, pricePerUnit } = billItemDraft;

    const found = inventoryItems.find(i => i.id === itemId);

    if (!found) return;

    const exists = lines.some(l => l.itemId === itemId && l.qty === qty);

    if (exists) return;

    const nextLine: BillLine = {
      lineId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      itemId,
      itemNameHi: found.nameHi,
      itemNameEn: found.nameEn,
      qty,
      unit,
      pricePerUnit,
      total: qty * pricePerUnit,
    };

    setLines(prev => [...prev, nextLine]);
  };

  const removeLine = (lineId: string) => {
    setLines(prev => prev.filter(l => l.lineId !== lineId));
  };

  // Add line when coming from AddBillItemScreen

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        contentContainer: {
          padding: 16,
          paddingBottom: 28,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        },
        headerButton: {
          width: 42,
          height: 42,
          borderRadius: 12,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 3,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        searchCard: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 18,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.04,
          shadowRadius: 10,
          elevation: 2,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        searchInput: {
          flex: 1,
          marginLeft: 12,
          fontSize: 14,
          color: theme.colors.textPrimary,
        },
        tableCard: {
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          padding: 16,
          marginBottom: 20,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 14,
          elevation: 3,
        },
        tableHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 14,
        },
        tableHeaderText: {
          fontSize: 12,
          fontWeight: '700',
          color: theme.colors.textMuted,
        },
        tableText: {
          fontSize: 14,
          color: theme.colors.textPrimary,
          marginBottom: 8,
        },
        tableRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        flex1: {
          flex: 1,
        },
        flex2: {
          flex: 2,
        },
        tableIconPlaceholder: {
          width: 34,
        },
        emptyLines: {
          paddingVertical: 28,
          alignItems: 'center',
          justifyContent: 'center',
        },
        emptyText: {
          color: theme.colors.textMuted,
          fontWeight: '700',
          fontSize: 14,
        },
        quickAddWrap: {
          marginTop: 14,
        },
        matchStrip: {
          paddingTop: 8,
          paddingBottom: 8,
          paddingHorizontal: 2,
        },
        matchChip: {
          backgroundColor: theme.colors.surface,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 16,
          marginRight: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        matchChipText: {
          fontWeight: '800',
          color: theme.colors.textPrimary,
          maxWidth: 120,
        },
        matchChipSub: {
          marginTop: 4,
          fontWeight: '800',
          color: theme.colors.textMuted,
          fontSize: 12,
        },
        iconButton: {
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        addItemButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 14,
          paddingVertical: 14,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          backgroundColor: 'rgba(249, 115, 22, 0.08)',
        },
        addItemLabel: {
          color: theme.colors.primary,
          fontWeight: '700',
          marginLeft: 10,
        },
        summaryCard: {
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          padding: 18,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 14,
          elevation: 3,
          marginBottom: 20,
        },
        summaryRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        },
        summaryLabel: {
          color: theme.colors.textMuted,
          fontSize: 13,
        },
        summaryValue: {
          color: theme.colors.textPrimary,
          fontSize: 16,
          fontWeight: '800',
        },
        dueLabel: {
          fontSize: 14,
        },
        dueValue: {
          color: theme.colors.primary,
          fontSize: 18,
        },
        footerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        },
        cancelButton: {
          flex: 1,
          paddingVertical: 16,
          borderRadius: 16,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        payButton: {
          flex: 1,
          paddingVertical: 16,
          borderRadius: 16,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
        },
        cancelText: {
          color: theme.colors.textMuted,
          fontWeight: '700',
        },
        payText: {
          color: theme.colors.onPrimary,
          fontWeight: '700',
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ marginHorizontal: 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ChevronLeft size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('createBill')}</Text>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.8}>
            <CreditCard size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <Search size={18} color={theme.colors.textMuted} />
          <TextInput
            placeholder={t('searchItemsBarcode')}
            placeholderTextColor={theme.colors.placeholder}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.flex2]}>
              {t('item')}
            </Text>
            <Text style={[styles.tableHeaderText, styles.flex1]}>
              {t('qty')}
            </Text>
            <Text style={[styles.tableHeaderText, styles.flex1]}>
              {t('price')}
            </Text>
            <Text style={[styles.tableHeaderText, styles.flex1]}>
              {t('total')}
            </Text>
            <View style={styles.tableIconPlaceholder} />
          </View>

          {lines.length === 0 ? (
            <View style={styles.emptyLines}>
              <Text style={styles.emptyText}>{t('noItemsFound')}</Text>
            </View>
          ) : (
            lines.map(item => (
              <View key={item?.lineId} style={styles.tableRow}>
                <Text
                  style={[styles.tableText, styles.flex2]}
                  numberOfLines={1}
                >
                  {item?.itemNameHi} ({item?.itemNameEn})
                </Text>
                <Text style={[styles.tableText, styles.flex1]}>
                  {item?.qty} {item?.unit}
                </Text>
                <Text style={[styles.tableText, styles.flex1]}>
                  ₹{item?.pricePerUnit}
                </Text>
                <Text style={[styles.tableText, styles.flex1]}>
                  ₹{item?.total ? item?.total?.toFixed(2) : '0.00'}
                </Text>
                <TouchableOpacity
                  style={styles.iconButton}
                  activeOpacity={0.7}
                  onPress={() => removeLine(item.lineId)}
                >
                  <Trash2 size={16} color={theme.colors.placeholder} />
                </TouchableOpacity>
              </View>
            ))
          )}

          <View style={styles.quickAddWrap}>
            <TouchableOpacity
              style={styles.addItemButton}
              activeOpacity={0.8}
              onPress={openAddScreen}
            >
              <Plus size={18} color={theme.colors.primary} />
              <Text style={styles.addItemLabel}>{t('addItem')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('totalItems')}</Text>
            <Text style={styles.summaryValue}>{totals.totalItems}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('totalAmount')}</Text>
            <Text style={styles.summaryValue}>
              ₹{totals.totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('discount')}</Text>
            <Text style={styles.summaryValue}>
              ₹{totals.discount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.dueLabel]}>
              {t('amountDue')}
            </Text>
            <Text style={[styles.summaryValue, styles.dueValue]}>
              ₹{totals.amountDue.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8}>
            <Text style={styles.cancelText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payButton} activeOpacity={0.8}>
            <Text style={styles.payText}>{t('payNow')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateBillScreen;
