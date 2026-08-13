import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme';
import type { RootStackParamList } from '../types/navigation';
import { useTranslation } from '../i18n/LanguageContext';
import type { KiranaStoreItemBilingual } from '../data/kiranaStoreItemsBilingual';
import { kiranaStoreItemsBilingual } from '../data/kiranaStoreItemsBilingual';

type ItemNameSelectRouteParams = {
  selectedItemId?: string;
  onSelect?: (itemId: string) => void;
};

const splitDisplayName = (displayName: string) => {
  // format: "Hindi (English)"
  const match = displayName.match(/^(.*)\((.*)\)\s*$/);
  if (!match) return { hi: displayName, en: displayName };
  const hi = match[1].trim();
  const en = match[2].trim();
  return { hi, en };
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

  const params = (route.params || {}) as ItemNameSelectRouteParams;
  const selectedItemId = params.selectedItemId;
  const onSelect = params.onSelect;

  const filteredItems: KiranaStoreItemBilingual[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return kiranaStoreItemsBilingual;

    return kiranaStoreItemsBilingual.filter(item => {
      const { hi, en } = splitDisplayName(item.displayName);
      return (
        hi.toLowerCase().includes(q) ||
        en.toLowerCase().includes(q) ||
        item.displayName.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSelect = (itemId: string) => {
    if (onSelect) {
      onSelect(itemId);
      navigation.goBack();
      return;
    }

    navigation.goBack();
  };

  const getDisplayText = (item: KiranaStoreItemBilingual) => {
    const { hi, en } = splitDisplayName(item.displayName);
    return language === 'hindi' ? hi : en;
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
                  <Text style={styles.listMeta}>{item.displayName}</Text>
                </View>

                {isSelected ? <Text style={styles.selectedMark}>✓</Text> : null}
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemNameSelectScreen;
