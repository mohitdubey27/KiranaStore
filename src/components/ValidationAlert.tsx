import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface ValidationAlertProps {
  visible?: boolean;
  message?: string;
  type?: 'error' | 'success' | 'warning';
  onClose?: () => void;
}

const ValidationAlert: React.FC<ValidationAlertProps> = ({
  visible = false,
  message,
  type = 'error',
  onClose,
}) => {
  if (!visible || !message) {
    return null;
  }

  const colorsByType = {
    error: {
      background: '#fee2e2',
      border: '#ef4444',
      text: '#b91c1c',
      title: 'Error',
    },
    success: {
      background: '#dcfce7',
      border: '#22c55e',
      text: '#166534',
      title: 'Success',
    },
    warning: {
      background: '#fff7ed',
      border: '#f59e0b',
      text: '#9a5b00',
      title: 'Warning',
    },
  } as const;

  const palette = colorsByType[type];

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(15, 23, 42, 0.35)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    container: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      color: palette.text,
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 20,
    },
    closeButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(255,255,255,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeText: {
      color: palette.text,
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 18,
    },
    text: {
      color: palette.text,
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 18,
    },
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{palette.title}</Text>
            {onClose ? (
              <TouchableOpacity
                testID="validation-alert-close"
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
              >
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.text} testID="validation-alert-message">
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ValidationAlert;
