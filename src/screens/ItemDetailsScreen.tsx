import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Edit3 } from 'lucide-react-native';
import {
  useNavigation,
  useRoute,
  type NavigationProp,
  type RouteProp,
} from '@react-navigation/native';
import { inventoryItems } from '../data/inventoryItems';
import GetItemIcon from '../utils/getItemIcon';
import { useTheme } from '../theme';
import type { RootStackParamList } from '../types/navigation';
import { useTranslation } from '../i18n/LanguageContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const ItemDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const item = inventoryItems.find(i => i.id === route.params.productId);

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
          paddingBottom: 24,
          backgroundColor: theme.colors.background,
        },
        headerBackground: {
          height: 140,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          backgroundColor: theme.colors.primaryVariant,
        },
        topBarTransparent: {
          position: 'absolute',
          top: 12,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
        },
        pageTitleOnHeader: {
          color: theme.colors.textPrimary,
          fontSize: 18,
          fontWeight: '800',
        },
        editButton: {
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.12)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        detailCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          padding: 18,
          marginTop: -40,
          marginBottom: 16,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 6,
        },
        detailHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        },
        avatarWrap: {
          width: 88,
          height: 88,
          borderRadius: 44,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          marginTop: -28,
          borderWidth: 6,
          borderColor: theme.colors.surface,
        },
        detailTitleWrap: { flex: 1 },
        itemTitle: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          marginBottom: 4,
        },
        categoryText: {
          fontSize: 13,
          color: theme.colors.textMuted,
          fontWeight: '600',
        },
        statusPillNew: {
          alignSelf: 'flex-start',
          backgroundColor: 'rgba(255,247,240,1)',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
          marginTop: 8,
        },
        statusTextNew: { color: '#D9822B', fontWeight: '800' },
        statRowNew: { flexDirection: 'row', marginTop: 16 },
        statItemNew: {
          flex: 1,
          padding: 14,
          borderRadius: 12,
          backgroundColor: 'rgba(255,247,240,1)',
          marginRight: 10,
          alignItems: 'center',
        },
        statItemNewAlt: {
          flex: 1,
          padding: 14,
          borderRadius: 12,
          backgroundColor: 'rgba(240,247,255,1)',
          alignItems: 'center',
        },
        statLabel: {
          fontSize: 12,
          color: theme.colors.textMuted,
          marginBottom: 6,
        },
        statValueNew: {
          fontSize: 18,
          fontWeight: '900',
          color: theme.colors.textPrimary,
        },
        infoCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
          padding: 18,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.colors.background,
        },
        infoRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.background,
        },
        infoLabel: { fontSize: 14, color: theme.colors.textMuted, flex: 1 },
        infoValue: {
          fontSize: 14,
          fontWeight: '700',
          color: theme.colors.textPrimary,
          textAlign: 'right',
        },
        actionRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 6,
        },
        actionButton: {
          flex: 1,
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        outlineButton: {
          borderWidth: 1,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.surface,
          marginRight: 12,
        },
        primaryButton: {
          backgroundColor: theme.colors.primary,
          flex: 1,
          elevation: 4,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },
        actionText: { fontWeight: '800', fontSize: 14 },
        outlineText: { color: theme.colors.primary },
        primaryText: { color: theme.colors.onPrimary },
        priceBadge: { alignItems: 'flex-end' },
        priceMain: {
          fontSize: 20,
          fontWeight: '900',
          color: theme.colors.textPrimary,
        },
        priceSub: { fontSize: 12, color: theme.colors.textMuted },
        emptyContainer: {
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        emptyText: {
          color: theme.colors.textMuted,
          fontSize: 16,
          fontWeight: '700',
        },
      }),
    [theme],
  );

  if (!item) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('itemNotFound')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBackground} />
        <View style={styles.topBarTransparent}>
          <BackButton onPress={() => navigation.goBack()} variant="dark" />
          <Text style={styles.pageTitleOnHeader}>{t('itemDetailsTitle')}</Text>
          <TouchableOpacity
            style={styles.editButton}
            accessibilityRole="button"
          >
            <Edit3 size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailHeaderRow}>
            <View style={styles.avatarWrap}>
              <GetItemIcon name={item.nameEn} />
            </View>
            <View style={styles.detailTitleWrap}>
              <Text style={styles.itemTitle}>
                {item.nameHi} ({item.nameEn})
              </Text>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.priceMain}>₹{item.sellingPrice}</Text>
              <Text style={styles.priceSub}>/ {item.priceUnit}</Text>
            </View>
          </View>

          <View style={styles.statusPillNew}>
            <Text style={styles.statusTextNew}>{t('stockStatusOk')}</Text>
          </View>

          <View style={styles.statRowNew}>
            <View style={styles.statItemNew}>
              <Text style={styles.statLabel}>{t('stockLabel')}</Text>
              <Text style={styles.statValueNew}>
                {item.quantity} {item.unit}
              </Text>
            </View>
            <View style={styles.statItemNewAlt}>
              <Text style={styles.statLabel}>{t('totalSalesLabel')}</Text>
              <Text style={styles.statValueNew}>
                {item.totalSold} {item.unit}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('purchasePrice')}</Text>
            <Text style={styles.infoValue}>
              ₹{item.purchasePrice} / {item.priceUnit}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('sellingPrice')}</Text>
            <Text style={styles.infoValue}>
              ₹{item.sellingPrice} / {item.priceUnit}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('minimumStockAlert')}</Text>
            <Text style={styles.infoValue}>
              {item.minStockAlert} {item.unit}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('lastUpdated')}</Text>
            <Text style={styles.infoValue}>{item.updatedAt}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('totalSalesLabel')}</Text>
            <Text style={styles.infoValue}>
              {item.totalSold} {item.unit}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.outlineButton]}
            accessibilityRole="button"
          >
            <Text style={[styles.actionText, styles.outlineText]}>
              {t('updateStock')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            accessibilityRole="button"
          >
            <Text style={[styles.actionText, styles.primaryText]}>
              {t('sellButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// styles are created with React.useMemo above to be theme-aware

export default ItemDetailsScreen;
