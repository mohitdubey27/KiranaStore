import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  style,
  textStyle,
  testID,
  disabled,
}) => {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.colors.primary;
  const txtColor = textColor || theme.colors.onPrimary;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor },
        style,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          { color: txtColor },
          textStyle,
          disabled ? styles.disabledText : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default CustomButton;
