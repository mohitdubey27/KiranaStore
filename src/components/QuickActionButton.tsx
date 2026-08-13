import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (() => {
    const theme = useTheme();

    const styles = React.useMemo(
      () =>
        StyleSheet.create({
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            marginHorizontal: 8,
            marginBottom: 12,
            backgroundColor: theme.colors.surface,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          },
          iconContainer: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          },
          label: {
            fontSize: 12,
            color: theme.colors.textPrimary,
            textAlign: 'center',
            fontWeight: '500',
          },
        }),
      [theme],
    );

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  })();
};

// styles are generated via theme in render for memoization

export default QuickActionButton;
