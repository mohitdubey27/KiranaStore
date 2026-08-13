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
import { useTranslation } from '../i18n/LanguageContext';
import type { KiranaStoreBrandBilingual } from '../data/kiranaStoreBrandsBilingual';
import { kiranaStoreBrandsBilingual } from '../data/kiranaStoreBrandsBilingual';

type BrandSelectRouteParams = {
  selectedBrandId?: string;
  onSelect?: (id: string) => void;
};

const splitDisplayName = (displayName: string) => {
  const match = displayName.match(/^(.*)\((.*)\)\s*$/);
  if (!match) return { hi: displayName, en: displayName };
  return { hi: match[1].trim(), en: match[2].trim() };
};

const getBrandText = (brand: KiranaStoreBrandBilingual, language: any) => {
  const { hi, en } = splitDisplayName(brand.displayName);
  return language === 'hindi' ? hi : en;
};

const BrandSelectScreen: React.FC = () => {
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

  const params = (route.params || {}) as BrandSelectRouteParams;
  const selectedBrandId = params.selectedBrandId;
  const onSelect = params.onSelect;

  const filteredBrands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return kiranaStoreBrandsBilingual;

    return kiranaStoreBrandsBilingual.filter(brand => {
      const { hi, en } = splitDisplayName(brand.displayName);
      return (
        hi.toLowerCase().includes(q) ||
        en.toLowerCase().includes(q) ||
        brand.displayName.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSelect = (brandId: string) => {
    if (onSelect) {
      onSelect(brandId);
      navigation.goBack();
      return;
    }
    navigation.goBack();
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
        <Text style={styles.title}>{t('selectItem') || 'Select Brand'}</Text>
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
          data={filteredBrands}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>{t('noItemsFound')}</Text>
          )}
          renderItem={({ item }) => {
            const displayText = getBrandText(item, language);
            const isSelected = selectedBrandId === item.id;

            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item.id)}
                accessibilityRole="button"
              >
                <View style={styles.itemDetails}>
                  <Text style={styles.listText}>{displayText}</Text>
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

export default BrandSelectScreen;
