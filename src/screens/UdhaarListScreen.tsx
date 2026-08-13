import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import { getCustomers, CustomerRecord } from '../services/sqlite/kiranaDb';
import type { TranslationKey } from '../i18n/strings';

const UdhaarListScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const theme = useTheme();

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const list = await getCustomers();
      setCustomers(list);
    } catch (error) {
      console.error('[UdhaarListScreen] loadCustomers error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadCustomers();
    }
  }, [isFocused]);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        pageHeader: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 8,
        },
        pageTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        summaryCard: {
          marginHorizontal: 16,
          marginTop: 12,
          borderRadius: 18,
          backgroundColor: theme.colors.surface,
          padding: 18,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 18,
          elevation: 6,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        summaryLabel: {
          color: theme.colors.textMuted,
          fontSize: 14,
          marginBottom: 6,
        },
        summaryAmount: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        summarySub: {
          marginTop: 8,
          fontSize: 14,
          color: theme.colors.textMuted,
        },
        searchSection: { marginHorizontal: 16, marginTop: 20 },
        searchHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        },
        searchLabel: { color: theme.colors.textPrimary, fontWeight: '700' },
        addButton: {
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: theme.colors.primary,
        },
        addButtonText: {
          color: theme.colors.onPrimary,
          fontWeight: '700',
          fontSize: 14,
        },
        searchBox: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 12,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.04,
          shadowRadius: 12,
          elevation: 4,
        },
        searchIcon: {
          fontSize: 16,
          marginRight: 10,
          color: theme.colors.textMuted,
        },
        searchInput: { flex: 1, fontSize: 16, color: theme.colors.textPrimary },
        listContent: {
          paddingHorizontal: 16,
          paddingBottom: 24,
          paddingTop: 10,
        },
        customerCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 18,
          padding: 16,
          marginBottom: 12,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        customerRow: { flexDirection: 'row', alignItems: 'center' },
        avatar: {
          width: 52,
          height: 52,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        },
        avatarText: {
          fontSize: 16,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        customerInfo: { flex: 1 },
        customerName: {
          fontSize: 16,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        customerMeta: {
          marginTop: 4,
          color: theme.colors.textMuted,
          fontSize: 13,
        },
        amountContainer: {
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: 52,
        },
        amount: { fontSize: 16, fontWeight: '800' },
        dueAmount: { color: theme.colors.danger },
        paidAmount: { color: theme.colors.primary },
        statusBadge: {
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 999,
        },
        statusDue: { backgroundColor: '#FFF7ED' },
        statusPaid: { backgroundColor: '#E8F6EF' },
        statusText: { fontSize: 12, fontWeight: '700' },
        statusTextDue: { color: '#D9822B' },
        statusTextPaid: { color: '#27AE60' },
        emptyState: { marginTop: 60, alignItems: 'center' },
        emptyText: { color: theme.colors.textMuted, fontSize: 15 },
      }),
    [theme],
  );

  const filteredData = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return customers;

    return customers.filter(customer => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();
      return (
        fullName.includes(term) ||
        (customer.phone ?? '').toLowerCase().includes(term)
      );
    });
  }, [customers, query]);

  const totalDue = useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.udhaarAmount, 0);
  }, [filteredData]);

  const renderCustomer = ({ item }: { item: CustomerRecord }) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    const isDue = item.udhaarAmount > 0;
    const initials = `${item.firstName.charAt(0) || ''}${
      item.lastName.charAt(0) || ''
    }`.toUpperCase();
    return (
      <TouchableOpacity
        style={styles.customerCard}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('CustomerDetails', { customerId: item.id })
        }
      >
        <View style={styles.customerRow}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: theme.colors.primaryVariant },
            ]}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{fullName}</Text>
            <Text style={styles.customerMeta}>
              {t('lastUdhaar') || 'Last udhaar'} •{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                isDue ? styles.dueAmount : styles.paidAmount,
              ]}
            >
              ₹{item.udhaarAmount.toLocaleString()}
            </Text>
            <View
              style={[
                styles.statusBadge,
                isDue ? styles.statusDue : styles.statusPaid,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isDue ? styles.statusTextDue : styles.statusTextPaid,
                ]}
              >
                {isDue ? t('due') || 'Due' : t('paid') || 'Paid'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>{t('udhaarList') || 'Udhaar List'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{t('totalDue') || 'Total Due'}</Text>
        <Text style={styles.summaryAmount}>₹ {totalDue.toLocaleString()}</Text>
        <Text style={styles.summarySub}>
          {filteredData.length} {t('customersDue') || 'customers due'}
        </Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchHeaderRow}>
          <Text style={styles.searchLabel}>
            {t('searchCustomerLabel') || 'Search customer'}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddCustomer')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              {t('addCustomer') || '+ Add'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('searchCustomerPlaceholder') || 'Search customer...'}
            placeholderTextColor={theme.colors.placeholder}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderCustomer}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {t('noCustomers' as unknown as TranslationKey) || 'No customers'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default UdhaarListScreen;
