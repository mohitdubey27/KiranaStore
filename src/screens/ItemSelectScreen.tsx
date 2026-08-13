import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import { inventoryItems } from '../data/inventoryItems';
import GetItemIcon from '../utils/getItemIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';

const ItemSelectScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { t } = useTranslation();
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: { padding: 16, flex: 1 },
        headerRow: {
          padding: 12,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        title: {
          fontSize: 18,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        searchInput: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          color: theme.colors.textPrimary,
          backgroundColor: theme.colors.surface,
        },
        listItem: { flexDirection: 'row', padding: 12, alignItems: 'center' },
        iconWrap: { width: 36, alignItems: 'center' },
        itemDetails: { flex: 1, marginLeft: 8 },
        listText: { fontWeight: '600', color: theme.colors.textPrimary },
        listMeta: { color: theme.colors.textMuted, marginTop: 2, fontSize: 12 },
        selectedMark: { color: theme.colors.primary, fontWeight: '700' },
        sep: { height: 1, backgroundColor: theme.colors.border },
        noItemsText: {
          padding: 16,
          color: theme.colors.textMuted,
          textAlign: 'center',
        },
      }),
    [theme],
  );
  const [searchQuery, setSearchQuery] = useState('');
  const selectedId = route.params?.selectedId as string | undefined;
  const onSelect = route.params?.onSelect as ((id: string) => void) | undefined;

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return inventoryItems;
    return inventoryItems.filter(item => {
      return (
        item.nameEn.toLowerCase().includes(q) ||
        item.nameHi.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSelect = (id: string) => {
    if (onSelect) {
      onSelect(id);
      nav.goBack();
      return;
    }
    // if no callback, navigate back with param
    nav.navigate('UnitConverter', { selectedId: id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <View style={styles.headerRow}>
        <BackButton onPress={() => nav.goBack()} />
        <Text style={styles.title}>{t('selectItem')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('searchInventoryPlaceholder')}
          placeholderTextColor={theme.colors.textMuted}
        />

        <FlatList
          data={filteredItems}
          keyExtractor={i => i.id}
          ListEmptyComponent={() => (
            <Text style={styles.noItemsText}>{t('noItemsFound')}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelect(item.id)}
            >
              <View style={styles.iconWrap}>
                <GetItemIcon name={item.nameEn} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.listText}>{item.nameEn}</Text>
                <Text style={styles.listMeta}>
                  {item.pricePerUnit
                    ? `₹${item.pricePerUnit}/${item.priceUnit}`
                    : item.category}
                </Text>
              </View>
              {selectedId === item.id ? (
                <Text style={styles.selectedMark}>✓</Text>
              ) : null}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      </View>
    </SafeAreaView>
  );
};

// styles are created with React.useMemo above to be theme-aware

export default ItemSelectScreen;
