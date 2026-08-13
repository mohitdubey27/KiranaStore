import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';
import { inventoryItems } from '../data/inventoryItems';
import GetItemIcon from '../utils/getItemIcon';
import {
  Preset,
  weightPresets,
  cashPresets,
  DEFAULT_AMOUNT,
} from '../constants/unitConverter';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const UnitCashConverterScreen: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'unitToCash' | 'cashToUnit'>('unitToCash');
  const [selectedId, setSelectedId] = useState(inventoryItems[0]?.id || '');
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const selectedItem = useMemo(
    () => inventoryItems.find(i => i.id === selectedId) || inventoryItems[0],
    [selectedId],
  );

  const unitOptions = useMemo(() => {
    const pu = selectedItem?.priceUnit?.toLowerCase() || 'kg';
    if (pu === 'kg') return ['g', 'kg'];
    if (pu === 'l' || pu === 'lt' || pu === 'litre') return ['ml', 'L'];
    return [pu];
  }, [selectedItem]);

  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0]);

  // keep selectedUnit in sync when item changes
  React.useEffect(() => {
    setSelectedUnit(unitOptions[0]);
  }, [selectedItem]);

  const route = useRoute<RouteProp<RootStackParamList, 'UnitConverter'>>();
  React.useEffect(() => {
    const sid = route.params?.selectedId as string | undefined;
    if (sid) setSelectedId(sid);
  }, [route.params?.selectedId]);

  const parseNumber = (v: string) => {
    const n = parseFloat(v.replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  };

  const formatCurrency = (v: number) => `₹${v.toFixed(2)}`;

  const toPriceUnitFactor = (fromUnit: string, priceUnit: string) => {
    const f = fromUnit.toLowerCase();
    const p = priceUnit.toLowerCase();
    if (p === f) return 1;
    if (p === 'kg' && f === 'g') return 1 / 1000;
    if (p === 'g' && f === 'kg') return 1000;
    if ((p === 'l' || p === 'lt') && f === 'ml') return 1 / 1000;
    if (p === 'ml' && (f === 'l' || f === 'lt' || f === 'L')) return 1000;
    return 1;
  };

  const convert = () => {
    const amt = parseNumber(amount);
    const pricePerUnit = selectedItem?.pricePerUnit || 0;
    const priceUnit = (selectedItem?.priceUnit || 'kg').toLowerCase();

    if (mode === 'unitToCash') {
      const factor = toPriceUnitFactor(selectedUnit, priceUnit);
      const price = amt * factor * pricePerUnit;
      return {
        text: formatCurrency(price),
        sub: `${amt} ${selectedUnit} = ${formatCurrency(price)}`,
      };
    }

    // cash to unit
    if (pricePerUnit === 0) return { text: formatCurrency(0), sub: '' };
    const perUnit = pricePerUnit; // per priceUnit
    const unitFactor = toPriceUnitFactor(priceUnit, selectedUnit); // how many selectedUnit in one priceUnit
    const units = (amt / perUnit) * unitFactor;
    return {
      text: `${units.toFixed(2)} ${selectedUnit}`,
      sub: `${formatCurrency(amt)} = ${units.toFixed(2)} ${selectedUnit}`,
    };
  };

  const result = useMemo(
    () => convert(),
    [amount, selectedUnit, selectedItem, mode],
  );

  const nav = useNavigation<any>();

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
          backgroundColor: theme.colors.surface,
          flexGrow: 1,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          position: 'relative',
        },
        headerRightPlaceholder: { width: 35 },
        title: {
          fontSize: 18,
          fontWeight: '700',
          color: theme.colors.textPrimary,
          textAlign: 'center',
        },
        segmentWrap: {
          flexDirection: 'row',
          marginVertical: 12,
          backgroundColor: theme.colors.background,
          borderRadius: 8,
          overflow: 'hidden',
        },
        segment: { flex: 1, padding: 10, alignItems: 'center' },
        segmentActive: { backgroundColor: theme.colors.primary },
        segmentText: { color: theme.colors.textMuted, fontWeight: '600' },
        segmentTextActive: { color: theme.colors.onPrimary },
        field: { marginVertical: 8 },
        label: { color: theme.colors.textMuted, marginBottom: 6 },
        select: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
          borderRadius: 8,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        selectText: {
          flex: 1,
          marginLeft: 8,
          fontWeight: '600',
          color: theme.colors.textPrimary,
        },
        selectArrow: {
          marginLeft: 8,
          color: theme.colors.textMuted,
          fontWeight: '700',
        },
        iconWrap: { width: 36, alignItems: 'center' },
        fieldRow: { marginTop: 12 },
        fieldFlex: { marginBottom: 8 },
        input: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: 12,
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        },
        unitWrap: { flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' },
        unitBtn: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginRight: 8,
          marginBottom: 8,
        },
        unitBtnActive: { backgroundColor: theme.colors.primary },
        unitText: { color: theme.colors.textMuted },
        unitTextActive: { color: theme.colors.onPrimary },
        presetsWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
        presetBtn: {
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 8,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginRight: 8,
          marginBottom: 8,
        },
        presetText: { color: theme.colors.textPrimary },
        resultBox: {
          marginTop: 16,
          padding: 16,
          borderRadius: 8,
          backgroundColor: 'rgba(232,246,239,1)',
          alignItems: 'center',
        },
        resultTitle: { color: theme.colors.textMuted, marginBottom: 6 },
        resultMain: {
          fontSize: 20,
          fontWeight: '800',
          color: theme.colors.primary,
        },
        resultSub: { color: theme.colors.textMuted, marginTop: 6 },
        convertBtn: {
          marginTop: 18,
          backgroundColor: theme.colors.primary,
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
        },
        convertText: { color: theme.colors.onPrimary, fontWeight: '700' },
      }),
    [theme],
  );

  // presets moved to constants/unitConverter

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <BackButton onPress={() => nav.goBack()} />
          <Text style={styles.title}>{t('unitConverterTitle')}</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <View style={styles.segmentWrap}>
          <TouchableOpacity
            style={[
              styles.segment,
              mode === 'unitToCash' && styles.segmentActive,
            ]}
            onPress={() => setMode('unitToCash')}
          >
            <Text
              style={[
                styles.segmentText,
                mode === 'unitToCash' && styles.segmentTextActive,
              ]}
            >
              {t('unitToCash')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              mode === 'cashToUnit' && styles.segmentActive,
            ]}
            onPress={() => setMode('cashToUnit')}
          >
            <Text
              style={[
                styles.segmentText,
                mode === 'cashToUnit' && styles.segmentTextActive,
              ]}
            >
              {t('cashToUnit')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t('selectItem')}</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() =>
              nav.navigate('ItemSelect', {
                selectedId,
                onSelect: (id: string) => setSelectedId(id),
              })
            }
          >
            <View style={styles.iconWrap}>
              <GetItemIcon name={selectedItem?.nameEn || ''} />
            </View>
            <Text style={styles.selectText} numberOfLines={1}>
              {selectedItem?.nameEn || selectedItem?.nameHi}
            </Text>
            <Text style={styles.selectArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldFlex}>
            <Text style={styles.label}>
              {mode === 'unitToCash' ? t('enterAmount') : t('enterAmount')}
            </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder={t('unitPlaceholder')}
            />

            {/* presets */}
            <View style={styles.presetsWrap}>
              {(mode === 'unitToCash' ? weightPresets : cashPresets).map(p => (
                <TouchableOpacity
                  key={p.label}
                  style={styles.presetBtn}
                  onPress={() => {
                    setAmount(p.amount);
                    if (p.unit) setSelectedUnit(p.unit as any);
                  }}
                >
                  <Text style={styles.presetText}>{p.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.unitWrap}>
            {unitOptions.map(u => (
              <TouchableOpacity
                key={u}
                style={[
                  styles.unitBtn,
                  selectedUnit === u && styles.unitBtnActive,
                ]}
                onPress={() => setSelectedUnit(u)}
              >
                <Text
                  style={[
                    styles.unitText,
                    selectedUnit === u && styles.unitTextActive,
                  ]}
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{t('convertedTotal')}</Text>
          <Text style={styles.resultMain}>{result.text}</Text>
          {result.sub ? (
            <Text style={styles.resultSub}>{result.sub}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.convertBtn} onPress={() => {}}>
          <Text style={styles.convertText}>{t('convert')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnitCashConverterScreen;
