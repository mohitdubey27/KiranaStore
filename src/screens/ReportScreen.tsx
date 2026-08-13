import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/strings';
import { useTheme } from '../theme';
import { CalendarDays } from 'lucide-react-native';

type ReportStat = {
  id: string;
  label: TranslationKey;
  value: string;
  subFallback: string;
  subTranslationKey?: TranslationKey;
  accent: string;
};

const periods: TranslationKey[] = [
  'today',
  'sevenDays',
  'thirtyDays',
  'custom',
];

const topProducts = [
  { id: '1', name: 'Sugar', value: '350 kg' },
  { id: '2', name: 'Tea powder', value: '220 pack' },
  { id: '3', name: 'Mustard Oil', value: '180 L' },
];

const ReportScreen: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] =
    useState<TranslationKey>('thirtyDays');
  const theme = useTheme();

  const stats: ReportStat[] = [
    {
      id: '1',
      label: 'totalSales',
      value: '₹1,25,430',
      subFallback: '+18%',
      accent: theme.colors.primary,
    },
    {
      id: '2',
      label: 'totalProfit',
      value: '₹28,450',
      subFallback: '+15%',
      accent: theme.colors.primary,
    },
  ];

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          backgroundColor: theme.colors.background,
          zIndex: 10,
          elevation: 4,
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        headerAction: {
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
        container: { padding: 16 },
        scrollView: { flex: 1, backgroundColor: theme.colors.background },
        scrollContent: {
          paddingBottom: 24,
          backgroundColor: theme.colors.background,
        },
        periodRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        periodButton: {
          flexBasis: '48%',
          marginBottom: 10,
          paddingVertical: 14,
          borderRadius: 16,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 1,
        },
        periodButtonActive: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        periodButtonRight: {
          marginLeft: 0,
        },
        periodText: {
          color: theme.colors.textPrimary,
          fontWeight: '700',
          fontSize: 13,
        },
        periodTextActive: { color: theme.colors.onPrimary },
        statsGrid: { marginBottom: 24 },
        statRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 14,
        },
        statCard: {
          flex: 1,
          minHeight: 130,
          borderRadius: 20,
          backgroundColor: theme.colors.surface,
          padding: 18,
          marginRight: 10,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 14,
          elevation: 3,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        statAccentBar: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
        },
        lastStatCard: { marginRight: 0 },
        statLabel: {
          color: theme.colors.textMuted,
          fontSize: 12,
          marginBottom: 6,
        },
        statValue: {
          fontSize: 20,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        statSub: { marginTop: 8, fontSize: 12, fontWeight: '700' },
        topSellingHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        viewMoreText: { color: theme.colors.primary, fontWeight: '700' },
        productList: {
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          padding: 16,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 14,
          elevation: 3,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        productRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        productIndex: {
          width: 34,
          height: 34,
          borderRadius: 12,
          backgroundColor: theme.colors.primary,
          marginRight: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        productIndexText: { color: theme.colors.onPrimary, fontWeight: '800' },
        productInfo: { flex: 1 },
        productName: {
          fontSize: 14,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        productValue: {
          fontSize: 12,
          color: theme.colors.textMuted,
          marginTop: 4,
        },
        productRank: {
          fontSize: 14,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
      }),
    [theme],
  );

  const statRows: ReportStat[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    statRows.push(stats.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>{t('reportsTitle') || 'Reports'}</Text>
        <TouchableOpacity style={styles.headerAction} activeOpacity={0.8}>
          <CalendarDays size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.periodRow}>
            {periods.map((period, index) => {
              const isActive = selectedPeriod === period;
              return (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    isActive && styles.periodButtonActive,
                    index % 2 === 1 && styles.periodButtonRight,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.periodText,
                      isActive && styles.periodTextActive,
                    ]}
                  >
                    {t(period) || period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.statsGrid}>
            {statRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.statRow}>
                {row.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.statCard,
                      index === row.length - 1 && styles.lastStatCard,
                    ]}
                  >
                    <View
                      style={[
                        styles.statAccentBar,
                        { backgroundColor: item.accent },
                      ]}
                    />
                    <Text style={styles.statLabel}>
                      {t(item.label) || item.label}
                    </Text>
                    <Text style={styles.statValue}>{item.value}</Text>
                    <Text style={[styles.statSub, { color: item.accent }]}>
                      {item.subTranslationKey
                        ? t(item.subTranslationKey) || item.subFallback
                        : item.subFallback}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.topSellingHeader}>
            <Text style={styles.sectionTitle}>
              {t('topSelling') || 'Top Selling'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>
                {t('viewMore') || 'View More'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productList}>
            {topProducts.map(item => (
              <View key={item.id} style={styles.productRow}>
                <View style={styles.productIndex}>
                  <Text style={styles.productIndexText}>{item.id}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productValue}>{item.value}</Text>
                </View>
                <Text style={styles.productRank}>#{item.id}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
