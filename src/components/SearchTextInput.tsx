import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '../theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
  onPressAdd?: () => void;
};

const SearchTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  onPressFilter,
  onPressAdd,
}) => {
  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        inputWrap: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 10,
          paddingVertical: 15,
        },
        searchIconWrap: {
          width: 28,
          alignItems: 'center',
        },
        input: {
          flex: 1,
          paddingHorizontal: 6,
          fontSize: 14,
          color: theme.colors.textPrimary,
          fontWeight: '500',
        },
        filterText: {
          fontSize: 18,
          color: theme.colors.textMuted,
          fontWeight: '800',
        },
        addBtn: {
          marginLeft: 10,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        },
        addText: {
          color: theme.colors.onPrimary,
          fontSize: 22,
          fontWeight: '800',
          lineHeight: Platform.OS === 'ios' ? 22 : 20,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.row}>
      <View style={styles.inputWrap}>
        <View style={styles.searchIconWrap}>
          <Search width={18} height={18} color={theme.colors.textMuted} />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
        />
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={onPressAdd}
        accessibilityRole="button"
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTextInput;
