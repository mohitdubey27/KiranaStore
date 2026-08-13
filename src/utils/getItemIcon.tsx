import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Coffee, Droplet, Leaf, Sparkles, Package } from 'lucide-react-native';
import { useTheme } from '../theme';

// Returns a small circular icon (emoji) based on item name.
export default function GetItemIcon({ name }: { name: string }) {
  const key = name ? name.toLowerCase() : '';

  let IconComponent = Package;
  const theme = useTheme();
  let bg = theme.colors.background;

  if (key.includes('sugar') || key.includes('चीनी') || key.includes('powder')) {
    IconComponent = Package;
    bg = '#FFF7ED';
  } else if (key.includes('rice') || key.includes('चावल')) {
    IconComponent = Sparkles;
    bg = '#FFF9F0';
  } else if (
    key.includes('oil') ||
    key.includes('तेल') ||
    key.includes('mustard')
  ) {
    IconComponent = Droplet;
    bg = '#FFF8F0';
  } else if (key.includes('tea') || key.includes('चाय')) {
    IconComponent = Coffee;
    bg = '#FFFDF0';
  } else if (key.includes('dal') || key.includes('दाल')) {
    IconComponent = Leaf;
    bg = '#FFF7F9';
  }

  // Fallback to a safe icon if the chosen IconComponent is undefined
  const SafeIcon = IconComponent || Package;

  return (
    <View style={[styles.wrap, { backgroundColor: bg }]}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <SafeIcon color={theme.colors.textPrimary} size={22} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
});
