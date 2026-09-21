import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import { getLogin } from '../services/sqlite/kiranaDb';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const pulse = useRef(new Animated.Value(0)).current;
  const { isLanguageLoaded } = useTranslation();

  const theme = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: theme.colors.primary,
          overflow: 'hidden',
        },
        background: {
          ...StyleSheet.absoluteFill,
          backgroundColor: theme.colors.primary,
        },
        rippleOne: {
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: 180,
          top: -90,
          right: -90,
          backgroundColor: theme.colors.primary,
          opacity: 0.18,
        },
        rippleTwo: {
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: 150,
          left: -80,
          bottom: -100,
          backgroundColor: theme.colors.surface,
          opacity: 0.08,
        },
        rippleThree: {
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: 110,
          right: 32,
          bottom: 140,
          backgroundColor: '#4f7bfd',
          opacity: 0.14,
        },
        content: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 28,
        },
        pulseCircle: {
          position: 'absolute',
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: theme.colors.surface,
          opacity: 0.35,
        },
        logoShell: {
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: theme.colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.15,
          shadowRadius: 28,
          shadowOffset: { width: 0, height: 18 },
          elevation: 10,
        },
        logoText: {
          fontSize: 62,
          fontWeight: '900',
          color: theme.colors.primary,
          letterSpacing: -1,
        },
        title: {
          marginTop: 32,
          color: theme.colors.onPrimary,
          fontSize: 32,
          fontWeight: '800',
          textAlign: 'center',
        },
        subtitle: {
          marginTop: 16,
          color: theme.colors.onPrimary,
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
          opacity: 0.9,
        },
        taglineCard: {
          marginTop: 28,
          paddingVertical: 14,
          paddingHorizontal: 22,
          borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.16)',
        },
        taglineText: {
          color: theme.colors.onPrimary,
          fontSize: 15,
          textAlign: 'center',
          letterSpacing: 0.2,
        },
      }),
    [theme],
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulse]);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const navigateAfterLoad = async () => {
      if (!mounted || !isLanguageLoaded) return;

      timer = setTimeout(async () => {
        if (!mounted) return;

        const login = await getLogin();
        if (!mounted) return;

        navigation.replace(login ? 'HomeScreen' : 'StartScreen');
      }, 1500);
    };

    navigateAfterLoad();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [navigation, isLanguageLoaded]);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.55],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background} pointerEvents="none">
        <View style={styles.rippleOne} />
        <View style={styles.rippleTwo} />
        <View style={styles.rippleThree} />
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.pulseCircle,
            { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
          ]}
        />
        <View style={styles.logoShell}>
          <Text style={styles.logoText}>K</Text>
        </View>
        <Text style={styles.title}>Kirana Store</Text>
        <Text style={styles.subtitle}>
          Your local shop, reimagined for fast everyday needs.
        </Text>
        <View style={styles.taglineCard}>
          <Text style={styles.taglineText}>
            Simple. Friendly. Close to home.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
