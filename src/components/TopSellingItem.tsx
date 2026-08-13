import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface TopSellingItemProps {
  rank: number;
  name: string;
  quantity: string;
}

const TopSellingItem: React.FC<TopSellingItemProps> = ({
  rank,
  name,
  quantity,
}) => {
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.background,
        },
        rankContainer: {
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        rank: {
          color: theme.colors.onPrimary,
          fontSize: 13,
          fontWeight: '700',
        },
        content: {
          flex: 1,
        },
        name: {
          fontSize: 14,
          color: theme.colors.textPrimary,
          fontWeight: '500',
        },
        quantity: {
          fontSize: 14,
          color: theme.colors.textMuted,
          fontWeight: '600',
        },
      }),
    [theme],
  );

  return (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{rank}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  );
};
export default TopSellingItem;
