import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';
import { useTheme } from '../theme';
import BackButton from '../components/BackButton';
import { useTranslation } from '../i18n/LanguageContext';
import { Edit3 } from 'lucide-react-native';
import Loader from '../components/Loader';
import {
  getCustomerById,
  getTransactionsForCustomer,
  addCustomerTransaction,
  CustomerRecord,
  CustomerTransactionRecord,
} from '../services/sqlite/kiranaDb';
import type { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const [customer, setCustomer] = useState<CustomerRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const customerId = route.params?.customerId;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const theme = useTheme();

  const [transactions, setTransactions] = useState<CustomerTransactionRecord[]>(
    [],
  );
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'Udhaar' | 'Payment'>(
    'Udhaar',
  );
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [transactionSaving, setTransactionSaving] = useState(false);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        container: { padding: 16, paddingBottom: 112 },
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
        editButton: {
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 2,
        },
        profileCard: {
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          padding: 18,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 14,
          elevation: 4,
          marginBottom: 18,
        },
        avatar: {
          width: 68,
          height: 68,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        },
        avatarText: {
          fontSize: 22,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        profileInfo: { flex: 1 },
        customerName: {
          fontSize: 20,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          marginBottom: 4,
        },
        customerPhone: { fontSize: 14, color: theme.colors.textMuted },
        summaryRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        },
        statCard: {
          flex: 1,
          borderRadius: 20,
          padding: 16,
          backgroundColor: theme.colors.surface,
        },
        statCardLeft: { marginRight: 10 },
        statCardRight: { marginLeft: 10 },
        statLabel: {
          fontSize: 13,
          color: theme.colors.textMuted,
          marginBottom: 10,
        },
        statValue: {
          fontSize: 20,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        dueValue: { color: theme.colors.danger },
        paidValue: { color: theme.colors.primary },
        balanceCard: {
          borderRadius: 22,
          backgroundColor: 'rgba(254,230,230,1)',
          padding: 18,
          marginBottom: 20,
        },
        balanceLabel: {
          fontSize: 14,
          color: 'rgba(223,38,35,1)',
          marginBottom: 8,
        },
        balanceValue: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.colors.danger,
        },
        historyHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        },
        historyTitle: {
          fontSize: 16,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        historyLink: {
          fontSize: 13,
          fontWeight: '700',
          color: theme.colors.primary,
        },
        historyRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.surface,
          borderRadius: 18,
          padding: 16,
          marginBottom: 12,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.04,
          shadowRadius: 10,
          elevation: 2,
        },
        historyLeft: { flex: 1 },
        historyDate: {
          fontSize: 13,
          color: theme.colors.textMuted,
          marginBottom: 4,
        },
        historyType: {
          fontSize: 15,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        historyAmount: {
          fontSize: 16,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        actionRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        bottomActionRow: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20,
          padding: 16,
          paddingBottom: 20,
          backgroundColor: theme.colors.background,
        },
        actionButton: {
          flex: 1,
          borderRadius: 16,
          paddingVertical: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        actionOutline: {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          marginRight: 10,
        },
        actionSolid: { backgroundColor: theme.colors.primary },
        actionText: {
          fontSize: 15,
          fontWeight: '700',
          color: theme.colors.onPrimary,
        },
        actionOutlineText: { color: theme.colors.primary },
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          justifyContent: 'center',
          padding: 20,
        },
        modalContainer: {
          borderRadius: 22,
          backgroundColor: theme.colors.background,
          padding: 20,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 10,
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          marginBottom: 16,
        },
        modalLabel: {
          fontSize: 13,
          color: theme.colors.textMuted,
          marginBottom: 8,
        },
        modalInput: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 14,
          fontSize: 15,
          color: theme.colors.textPrimary,
          backgroundColor: theme.colors.surface,
          marginBottom: 16,
          textAlignVertical: 'top',
        },
        modalButtonRow: {
          flexDirection: 'row',
          marginTop: 8,
        },
        whiteText: { color: theme.colors.onPrimary },
      }),
    [theme],
  );

  const loadCustomer = async () => {
    if (!customerId) {
      return;
    }

    try {
      const record = await getCustomerById(customerId);
      setCustomer(record);
    } catch (error) {
      console.error('[CustomerDetailsScreen] getCustomerById error:', error);
    }
  };

  const loadTransactions = async () => {
    if (!customerId) {
      return;
    }

    try {
      const transactionRecords = await getTransactionsForCustomer(customerId);
      setTransactions(transactionRecords);
    } catch (error) {
      console.error(
        '[CustomerDetailsScreen] getTransactionsForCustomer error:',
        error,
      );
    }
  };

  const loadData = async () => {
    if (!customerId) {
      return;
    }

    setLoading(true);
    try {
      await Promise.all([loadCustomer(), loadTransactions()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [customerId]);

  const openTransactionModal = (type: 'Udhaar' | 'Payment') => {
    setTransactionType(type);
    setTransactionAmount('');
    setTransactionNote('');
    setShowTransactionModal(true);
  };

  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setTransactionAmount('');
    setTransactionNote('');
  };

  const handleSaveTransaction = async () => {
    if (!customerId) {
      return;
    }

    const amount = Number(transactionAmount.replace(/[^0-9.]/g, ''));
    if (!transactionAmount.trim() || Number.isNaN(amount) || amount <= 0) {
      Alert.alert(
        t('error') || 'Error',
        t('udhaarAmountInvalid') || 'Please enter a valid amount',
      );
      return;
    }

    setTransactionSaving(true);
    try {
      await addCustomerTransaction(customerId, {
        type: transactionType,
        amount,
        note: transactionNote.trim() || null,
      });
      await loadData();
      closeTransactionModal();
    } catch (error: any) {
      console.error(
        '[CustomerDetailsScreen] addCustomerTransaction error:',
        error,
      );
      Alert.alert(
        t('error') || 'Error',
        error?.message || 'Failed to save transaction',
      );
    } finally {
      setTransactionSaving(false);
    }
  };

  const currentCustomer = customer;

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <Loader visible message={t('loading') || 'Loading...'} />
      </SafeAreaView>
    );
  }

  if (!currentCustomer) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <Text style={{ color: theme.colors.textPrimary, fontSize: 16 }}>
            {t('customerNotFound') || 'Customer not found'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const initials = `${currentCustomer.firstName.charAt(0) || ''}${
    currentCustomer.lastName.charAt(0) || ''
  }`.toUpperCase();
  const fullName = `${currentCustomer.firstName} ${currentCustomer.lastName}`;
  const totalUdhaar = `₹${currentCustomer.udhaarAmount.toLocaleString()}`;
  const totalPayment = `₹${transactions
    .filter(item => item.type === 'Payment')
    .reduce((sum, item) => sum + item.amount, 0)
    .toLocaleString()}`;
  const remainingDue = `₹${currentCustomer.udhaarAmount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>
            {t('customerDetails') || 'Customer Details'}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddCustomer', { customerId })}
          >
            <Edit3 size={16} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: theme.colors.primaryVariant },
            ]}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.customerName}>{fullName}</Text>
            <Text style={styles.customerPhone}>
              {currentCustomer.phone || '-'}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.statCard, styles.statCardLeft]}>
            <Text style={styles.statLabel}>
              {t('totalUdhaar') || 'Total Udhaar'}
            </Text>
            <Text style={[styles.statValue, styles.dueValue]}>
              {totalUdhaar}
            </Text>
          </View>
          <View style={[styles.statCard, styles.statCardRight]}>
            <Text style={styles.statLabel}>
              {t('totalPayment') || 'Total Payment'}
            </Text>
            <Text style={[styles.statValue, styles.paidValue]}>
              {totalPayment}
            </Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            {t('remainingDue') || 'Remaining Due'}
          </Text>
          <Text style={styles.balanceValue}>{remainingDue}</Text>
        </View>

        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>
            {t('transactionHistory') || 'Transaction History'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.historyLink}>{t('viewAll') || 'View All'}</Text>
          </TouchableOpacity>
        </View>

        {transactions.length === 0 ? (
          <Text style={{ color: theme.colors.textMuted, marginBottom: 16 }}>
            {t('noUdhaarFound') || 'No records found'}
          </Text>
        ) : (
          transactions.map(item => (
            <View key={item.id} style={styles.historyRow}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyDate}>
                  {new Date(item.createdAt).toLocaleDateString()}{' '}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </Text>
                <Text style={styles.historyType}>
                  {item.type === 'Payment'
                    ? t('payment') || 'Payment'
                    : t('udhaar') || 'Udhaar'}
                </Text>
                {item.note ? (
                  <Text style={[styles.historyDate, { marginTop: 6 }]}>
                    {' '}
                    {item.note}
                  </Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.historyAmount,
                  item.type === 'Payment' ? styles.paidValue : styles.dueValue,
                ]}
              >
                {item.type === 'Payment' ? '-' : '+'}₹
                {item.amount.toLocaleString()}
              </Text>
            </View>
          ))
        )}

        <Modal
          visible={showTransactionModal}
          animationType="slide"
          transparent
          onRequestClose={closeTransactionModal}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {transactionType === 'Payment'
                  ? t('addPayment') || 'Add Payment'
                  : t('addUdhaar') || 'Add Udhaar'}
              </Text>

              <Text style={styles.modalLabel}>
                {t('udhaarAmount') || 'Udhaar amount'}
              </Text>
              <TextInput
                style={styles.modalInput}
                value={transactionAmount}
                keyboardType="decimal-pad"
                onChangeText={setTransactionAmount}
                placeholder={t('enterAmount') || 'Enter amount'}
                placeholderTextColor={theme.colors.placeholder}
              />

              <Text style={styles.modalLabel}>
                {t('payment') || 'Payment'} / {t('udhaar') || 'Udhaar'}{' '}
                {t('note') || 'Note'}
              </Text>
              <TextInput
                style={[styles.modalInput, { height: 100 }]}
                value={transactionNote}
                onChangeText={setTransactionNote}
                placeholder={t('note') || 'Enter note'}
                placeholderTextColor={theme.colors.placeholder}
                multiline
              />

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.actionOutline,
                    { flex: 1, marginRight: 10 },
                  ]}
                  activeOpacity={0.8}
                  onPress={closeTransactionModal}
                >
                  <Text style={[styles.actionText, styles.actionOutlineText]}>
                    {t('cancel') || 'Cancel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.actionSolid, { flex: 1 }]}
                  activeOpacity={0.8}
                  onPress={handleSaveTransaction}
                  disabled={transactionSaving}
                >
                  <Text style={styles.actionText}>{t('save') || 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
      <View style={styles.bottomActionRow}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionOutline]}
            activeOpacity={0.8}
            onPress={() => openTransactionModal('Udhaar')}
          >
            <Text style={[styles.actionText, styles.actionOutlineText]}>
              {t('addUdhaar') || 'Add Udhaar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionSolid]}
            activeOpacity={0.8}
            onPress={() => openTransactionModal('Payment')}
          >
            <Text style={styles.actionText}>
              {t('addPayment') || 'Add Payment'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader
        visible={transactionSaving}
        message={t('loading') || 'Saving...'}
      />
    </SafeAreaView>
  );
};

export default CustomerDetailsScreen;
