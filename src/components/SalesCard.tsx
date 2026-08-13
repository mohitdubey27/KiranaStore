import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { ChartNoAxesCombined } from 'lucide-react-native';

interface SalesCardProps {
  amount: string;
  percentage: string;
  label: string;
}

const SalesCard: React.FC<SalesCardProps> = ({ amount, percentage, label }) => {
  const theme = useTheme();
  const isPositive = !percentage.startsWith('-');

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: theme.colors.primary,
          borderRadius: 16,
          padding: 18,
          marginHorizontal: 16,
          marginVertical: 12,
          shadowColor: theme.colors.primary,
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        label: {
          fontSize: 13,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 8,
          fontWeight: '500',
        },
        content: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        amountSection: {
          flexDirection: 'row',
          alignItems: 'baseline',
        },
        amount: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.colors.onPrimary,
          marginRight: 12,
        },
        percentageContainer: {
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 6,
        },
        positive: {
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
        },
        negative: {
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
        },
        percentage: {
          fontSize: 12,
          fontWeight: '700',
        },
        percentagePositive: {
          color: '#22C55E',
        },
        percentageNegative: {
          color: '#EF4444',
        },
        cardContent: {
          flex: 1,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.content}>
          <View style={styles.amountSection}>
            <Text style={styles.amount}>{amount}</Text>
            <View
              style={[
                styles.percentageContainer,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              <Text
                style={[
                  styles.percentage,
                  isPositive
                    ? styles.percentagePositive
                    : styles.percentageNegative,
                ]}
              >
                {isPositive ? '+' : ''}
                {percentage}%
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ChartNoAxesCombined size={35} color={theme.colors.onPrimary} />
    </View>
  );
};

export default SalesCard;
