import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../theme';

interface CustomTextInputProps extends TextInputProps {
  title: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  placeholder,
  value,
  onChangeText,
  error,
  ...rest
}) => {
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 16,
        },
        title: {
          fontSize: 14,
          fontWeight: '600',
          color: theme.colors.textPrimary,
          marginBottom: 8,
        },
        textInput: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 14,
          color: theme.colors.textPrimary,
          backgroundColor: theme.colors.surface,
        },
        errorInput: {
          borderColor: theme.colors.danger,
        },
        errorText: {
          fontSize: 12,
          color: theme.colors.danger,
          marginTop: 6,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.textInput, error && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.placeholder}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;
