import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon }) => {
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          flex: 1,
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 14,
          marginHorizontal: 6,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        },
        label: {
          fontSize: 12,
          color: theme.colors.textMuted,
          marginBottom: 0,
          marginLeft: 8,
          flex: 1,
        },
        valueContainer: {
          flexDirection: 'row',
          alignItems: 'baseline',
        },
        value: {
          fontSize: 18,
          fontWeight: '700',
          color: theme.colors.textPrimary,
        },
        unit: {
          fontSize: 11,
          color: theme.colors.textMuted,
          marginLeft: 4,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
};

export default StatCard;
