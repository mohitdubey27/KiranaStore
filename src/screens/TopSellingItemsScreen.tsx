import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import TopSellingItem from '../components/TopSellingItem';
import type { RootStackParamList } from '../types/navigation';
import { inventoryItems } from '../data/inventoryItems';
import { SafeAreaView } from 'react-native-safe-area-context';

type TopSellingRow = {
  rank: number;
  name: string;
  quantity: string;
};

const formatQty = (quantity: number | undefined) => {
  if (quantity === undefined || Number.isNaN(quantity)) return '-';
  return String(quantity);
};

const TopSellingItemsScreen: React.FC = () => {
  const { t, language } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.background,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
        backBtn: {
          width: 40,
          height: 40,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          textAlign: 'center',
          flex: 1,
        },
        scrollContent: { padding: 16, paddingBottom: 24 },
        listCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          overflow: 'hidden',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        },
        footerSpace: { height: 24 },
      }),
    [theme],
  );

  const topSellingRows: TopSellingRow[] = useMemo(() => {
    const rows = [...inventoryItems]
      .map(item => {
        const sold = typeof item.totalSold === 'number' ? item.totalSold : 0;
        const unit = item.unit ? item.unit : '';
        const name = language === 'hindi' ? item.nameHi : item.nameEn;

        // `TopSellingItem` shows `quantity` string; we use sold quantity as the metric.
        const quantity = `${sold} ${unit}`.trim();

        return {
          id: item.id,
          sold,
          name,
          quantity,
        };
      })
      .sort((a, b) => b.sold - a.sold);

    return rows.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      quantity:
        row.quantity === '0' || row.quantity === '0 ' ? '-' : row.quantity,
    }));
  }, [language]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {t('topSelling') || 'Top Selling'}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listCard}>
          {topSellingRows.map(row => (
            <TopSellingItem
              key={row.rank}
              rank={row.rank}
              name={row.name}
              quantity={row.quantity}
            />
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

// styles are created with React.useMemo above to be theme-aware

export default TopSellingItemsScreen;
