import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme';

interface BackButtonProps {
  onPress: () => void;
  color?: string;
  variant?: 'light' | 'dark';
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color,
  variant = 'dark',
}) => {
  const theme = useTheme();

  const isDark = variant === 'dark';
  const bgColor = isDark ? theme.colors.surface : 'rgba(255,255,255,0.12)';
  const iconColor = isDark ? theme.colors.textPrimary : theme.colors.onPrimary;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        button: {
          width: 40,
          height: 40,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        },
      }),
    [theme],
  );

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <ArrowLeft size={20} color={color || iconColor} />
    </TouchableOpacity>
  );
};

export default BackButton;
