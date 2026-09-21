import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import Loader from '../components/Loader';
import {
  getInventoryItems,
  type InventoryItemRecord,
} from '../services/sqlite';

type ItemNameSelectRouteParams = {
  selectedItemId?: string;
  onSelect?: (itemId: string) => void;
};

const ItemNameSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { t, language } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: theme.colors.background },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        backBtn: {
          width: 40,
          height: 40,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.colors.textPrimary,
          flex: 1,
          textAlign: 'center',
        },
        content: { flex: 1, padding: 16 },
        searchInput: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: 12,
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
          marginBottom: 12,
        },
        listContent: { paddingBottom: 28 },
        listItem: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 4,
        },
        itemDetails: { flex: 1 },
        listText: { fontWeight: '800', color: theme.colors.textPrimary },
        listMeta: {
          marginTop: 2,
          color: theme.colors.textMuted,
          fontWeight: '600',
          fontSize: 12,
        },
        selectedMark: {
          color: theme.colors.primary,
          fontWeight: '900',
          fontSize: 18,
          marginLeft: 10,
        },
        sep: { height: 1, backgroundColor: theme.colors.border },
        emptyText: {
          paddingVertical: 20,
          color: theme.colors.textMuted,
          fontWeight: '700',
          textAlign: 'center',
        },
      }),
    [theme],
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<InventoryItemRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await getInventoryItems());
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [loadItems]),
  );

  const params = (route.params || {}) as ItemNameSelectRouteParams;
  const selectedItemId = params.selectedItemId;
  const onSelect = params.onSelect;

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;

    return items.filter(item => {
      return (
        item.nameHi.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q)
      );
    });
  }, [items, searchQuery]);

  const handleSelect = (itemId: string) => {
    if (onSelect) {
      onSelect(itemId);
      navigation.goBack();
      return;
    }

    navigation.goBack();
  };

  const getDisplayText = (item: InventoryItemRecord) => {
    return language === 'hindi' ? item.nameHi : item.nameEn;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('selectItem') || 'Select Item'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('searchInventoryPlaceholder')}
          placeholderTextColor={theme.colors.textMuted}
        />

        {loading ? (
          <Loader visible />
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={i => i.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>{t('noItemsFound')}</Text>
            )}
            renderItem={({ item }) => {
              const isSelected = selectedItemId === item.id;
              return (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleSelect(item.id)}
                  accessibilityRole="button"
                >
                  <View style={styles.itemDetails}>
                    <Text style={styles.listText}>{getDisplayText(item)}</Text>
                    <Text style={styles.listMeta}>
                      {language === 'hindi' ? item.nameEn : item.nameHi}
                    </Text>
                  </View>

                  {isSelected ? (
                    <Text style={styles.selectedMark}>✓</Text>
                  ) : null}
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ItemNameSelectScreen;
