import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AlertTriangle, Package } from 'lucide-react-native';
import Loader from '../components/Loader';
import SearchTextInput from '../components/SearchTextInput';
import GetItemIcon from '../utils/getItemIcon';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import {
  getInventoryItems,
  type InventoryItemRecord,
} from '../services/sqlite';

type StockFilter = 'all' | 'low' | 'out';

const LOW_STOCK_THRESHOLD = 5;

// Local type that extends the DB record with the price fields the UI expects
type InventoryItem = InventoryItemRecord & {
  pricePerUnit: number | null;
  priceUnit: string;
};

const InventoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t, language } = useTranslation();
  const theme = useTheme();

  const [filter, setFilter] = useState<StockFilter>('all');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const records = await getInventoryItems();
      // Map DB records to include the UI-expected price fields
      const mapped: InventoryItem[] = records.map(record => ({
        ...record,
        pricePerUnit: record.sellingPrice,
        priceUnit: record.unit || '',
      }));
      setItems(mapped);
    } catch (error) {
      console.error('[InventoryScreen] Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [loadItems]),
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items
      .filter(item => {
        if (filter === 'low') {
          return item.quantity > 0 && item.quantity <= LOW_STOCK_THRESHOLD;
        }
        if (filter === 'out') {
          return item.quantity === 0;
        }
        return true;
      })
      .filter(item => {
        if (!q) return true;
        const name = language === 'hindi' ? item.nameHi : item.nameEn;
        return name.toLowerCase().includes(q);
      });
  }, [filter, items, language, query]);

  const getName = (item: InventoryItem) =>
    language === 'hindi' ? item.nameHi : item.nameEn;

  const getBadge = (item: InventoryItem) => {
    if (item.quantity === 0) {
      return {
        label: t('outOfStock'),
        color: theme.colors.danger,
        bg: 'rgba(231, 76, 60, 0.12)',
        icon: (
          <AlertTriangle width={16} height={16} color={theme.colors.danger} />
        ),
      };
    }
    if (item.quantity > 0 && item.quantity <= LOW_STOCK_THRESHOLD) {
      return {
        label: t('lowStock'),
        color: theme.colors.primary,
        bg: 'rgba(249, 115, 22, 0.12)',
        icon: (
          <AlertTriangle width={16} height={16} color={theme.colors.primary} />
        ),
      };
    }

    return {
      label: t('inStock'),
      color: theme.colors.success,
      bg: 'rgba(39, 174, 96, 0.12)',
      icon: <Package width={16} height={16} color={theme.colors.success} />,
    };
  };

  const tabs: Array<{ key: StockFilter; label: string }> = [
    { key: 'all', label: t('all') },
    { key: 'low', label: t('lowStock') },
    { key: 'out', label: t('outOfStock') },
  ];

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        controlsWrap: {
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
        },
        tabs: {
          flexDirection: 'row',
          gap: 10 as any,
          marginTop: 12,
        },
        tab: {
          flex: 1,
          paddingVertical: 10,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
        },
        tabActive: {
          borderColor: theme.colors.primary,
          backgroundColor: 'rgba(249, 115, 22, 0.06)',
        },
        tabLabel: {
          fontSize: 13,
          fontWeight: '700',
          color: theme.colors.textMuted,
        },
        tabLabelActive: {
          color: theme.colors.primary,
        },
        listContent: {
          padding: 16,
          paddingBottom: 28,
          gap: 12 as any,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          padding: 14,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        cardTop: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        itemRow: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        },
        iconWrap: {
          width: 48,
          height: 48,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        itemTextWrap: {
          flex: 1,
          marginLeft: 12,
        },
        rightCol: {
          alignItems: 'flex-end',
        },
        priceText: {
          fontSize: 15,
          fontWeight: '800',
          color: theme.colors.textPrimary,
        },
        priceUnit: {
          fontSize: 12,
          color: theme.colors.textMuted,
          fontWeight: '700',
        },
        itemName: {
          fontSize: 15,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          marginBottom: 6,
        },
        itemMeta: {
          fontSize: 13,
          fontWeight: '600',
          color: theme.colors.textMuted,
        },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginTop: 8,
        },
        badgeIcon: {
          marginRight: 6,
        },
        badgeLabel: {
          fontSize: 12,
          fontWeight: '800',
        },
        empty: {
          paddingVertical: 28,
          alignItems: 'center',
        },
        emptyText: {
          color: theme.colors.textMuted,
          fontWeight: '700',
          fontSize: 14,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('inventoryTab')}</Text>
      </View>

      <View style={styles.controlsWrap}>
        <SearchTextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('searchInventoryPlaceholder')}
          onPressFilter={() => {}}
          onPressAdd={() => {
            navigation.navigate('AddItem');
          }}
        />

        <View style={styles.tabs}>
          {tabs.map(tab => {
            const active = filter === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setFilter(tab.key)}
                accessibilityRole="button"
              >
                <Text
                  style={[styles.tabLabel, active && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('noItemsFound')}</Text>
          </View>
        }
        renderItem={({ item }) => {
          try {
            const badge = getBadge(item);
            const name = getName(item);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ProductDetail', { productId: item.id })
                }
                accessibilityRole="button"
              >
                <View style={styles.cardTop}>
                  <View style={styles.itemRow}>
                    <View style={styles.iconWrap}>
                      <GetItemIcon name={name} />
                    </View>

                    <View style={styles.itemTextWrap}>
                      <Text style={styles.itemName}>{name}</Text>
                      <Text style={styles.itemMeta}>
                        {item.quantity} {item.unit}
                      </Text>
                    </View>

                    <View style={styles.rightCol}>
                      <Text style={styles.priceText}>
                        {item.pricePerUnit ? `₹${item.pricePerUnit}` : ''}
                      </Text>
                      <Text style={styles.priceUnit}>
                        {item.priceUnit ? `/${item.priceUnit}` : ''}
                      </Text>

                      <View
                        style={[styles.badge, { backgroundColor: badge.bg }]}
                      >
                        <View style={styles.badgeIcon}>{badge.icon}</View>
                        <Text
                          style={[styles.badgeLabel, { color: badge.color }]}
                        >
                          {badge.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          } catch (err) {
            // Prevent entire screen from crashing if a single item render fails
            // eslint-disable-next-line no-console
            console.error('Inventory renderItem error', err, item?.id);
            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.emptyText}>Unable to render item</Text>
                </View>
              </View>
            );
          }
        }}
      />

      <Loader visible={loading} message={t('loading') || 'Loading...'} />
    </View>
  );
};

export default InventoryScreen;
