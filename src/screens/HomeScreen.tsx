import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Plus,
  ShoppingCart,
  Package,
  ArrowRightLeft,
  Users,
  AlertTriangle,
} from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import SalesCard from '../components/SalesCard';
import StatCard from '../components/StatCard';
import QuickActionButton from '../components/QuickActionButton';
import TopSellingItem from '../components/TopSellingItem';
import Loader from '../components/Loader';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import {
  getHomeStats,
  getTopSellingItems,
  type HomeStats,
  type TopSellingItem as TopSellingItemType,
} from '../services/sqlite/kiranaDb';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<HomeStats>({
    totalSales: 0,
    totalSalesPercentage: 0,
    totalDebt: 0,
    totalItems: 0,
    lowStockCount: 0,
  });
  const [topSellingProducts, setTopSellingProducts] = useState<
    TopSellingItemType[]
  >([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [homeStats, topItems] = await Promise.all([
        getHomeStats(),
        getTopSellingItems(5),
      ]);
      setStats(homeStats);
      setTopSellingProducts(topItems);
    } catch (error) {
      console.error('[HomeScreen] loadData error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        statsGrid: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        },
        section: { paddingHorizontal: 16, paddingTop: 8 },
        sectionTitle: {
          fontSize: 16,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          marginBottom: 8,
        },
        quickActionsGrid: { flexDirection: 'row', gap: 12 },
        topSellingContainer: { marginTop: 12 },
        viewMore: { color: theme.colors.primary, fontWeight: '700' },
      }),
    [theme],
  );

  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              color: theme.colors.textPrimary,
            }}
          >
            {t('home') || 'Home'}
          </Text>
        </View>
        <Loader visible={loading} />
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            color: theme.colors.textPrimary,
          }}
        >
          {t('home') || 'Home'}
        </Text>
      </View>

      <ScrollView>
        <SalesCard
          label={t('totalSales')}
          amount={formatCurrency(stats.totalSales)}
          percentage={String(stats.totalSalesPercentage)}
        />
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Users width={18} height={18} color={theme.colors.primary} />}
            label={t('totalDebt')}
            value={formatCurrency(stats.totalDebt)}
            unit="₹"
          />
          <StatCard
            icon={
              <Package width={18} height={18} color={theme.colors.primary} />
            }
            label={t('totalItems')}
            value={String(stats.totalItems)}
            unit="items"
          />
          <StatCard
            icon={
              <AlertTriangle
                width={18}
                height={18}
                color={theme.colors.danger}
              />
            }
            label={t('lowStock')}
            value={String(stats.lowStockCount)}
            unit="items"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon={
                <Plus width={28} height={28} color={theme.colors.onPrimary} />
              }
              label={t('addItem')}
              onPress={() => navigation.navigate('AddItem')}
            />
            <QuickActionButton
              icon={
                <ShoppingCart
                  width={28}
                  height={28}
                  color={theme.colors.onPrimary}
                />
              }
              label={t('createBill')}
              onPress={() => navigation.navigate('CreateBill')}
            />
            <QuickActionButton
              icon={
                <ArrowRightLeft
                  width={28}
                  height={28}
                  color={theme.colors.onPrimary}
                />
              }
              label={t('unitConverter')}
              onPress={() => navigation.navigate('UnitConverter')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.sectionTitle}>{t('topSelling')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TopSellingItems')}
            >
              <Text style={styles.viewMore}>{t('viewMore')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.topSellingContainer}>
            {topSellingProducts.length > 0 ? (
              topSellingProducts.map(product => (
                <TopSellingItem
                  key={product.rank}
                  rank={product.rank}
                  name={product.name}
                  quantity={product.quantity}
                />
              ))
            ) : (
              <Text
                style={{
                  color: theme.colors.textMuted,
                  textAlign: 'center',
                  paddingVertical: 16,
                  fontSize: 14,
                }}
              >
                {t('noItemsFound') || 'No items sold yet'}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
