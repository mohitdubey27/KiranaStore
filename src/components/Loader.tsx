import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

interface LoaderProps {
  visible: boolean;
  message?: string;
  style?: StyleProp<ViewStyle>;
}

const Loader: React.FC<LoaderProps> = ({ visible, message, style }) => {
  if (!visible) return null;

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        },
        box: {
          padding: 24,
          borderRadius: 16,
          backgroundColor: 'rgba(28, 31, 43, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        message: {
          marginTop: 12,
          color: theme.colors.onPrimary,
          fontSize: 15,
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return (
    <View style={[styles.overlay, style]} pointerEvents="auto">
      <View style={styles.box}>
        <ActivityIndicator size="large" color={theme.colors.onPrimary} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

export default Loader;
