import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House,
  Package,
  FileText,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react-native';
import { useTheme } from '../theme';
import { useTranslation } from '../i18n/LanguageContext';
import HomeScreen from '../screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import InventoryScreen from '../screens/InventoryScreen.tsx';
import UdhaarListScreen from '../screens/UdhaarListScreen';
import ReportScreen from '../screens/ReportScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

// TabBarIcon will be defined inside HomeNavigator to access theme

const PlaceholderScreen: React.FC = () => {
  return null;
};

const HomeNavigator: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const TabBarIcon: React.FC<TabBarIconProps & { name: string }> = ({
    name,
    focused,
    color,
    size,
  }) => {
    const iconProps = {
      size,
      color: color ?? theme.colors.textMuted,
    };

    switch (name) {
      case 'home':
        return <House {...iconProps} />;
      case 'inventory':
        return <Package {...iconProps} />;
      case 'debt':
        return <Users {...iconProps} />;
      case 'reports':
        return <BarChart3 {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      default:
        return <House {...iconProps} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.background,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={route.name}
              focused={focused}
              color={color}
              size={24}
            />
          ),
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: t('homeTab'),
          }}
        />
        <Tab.Screen
          name="inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: t('inventoryTab'),
          }}
        />
        <Tab.Screen
          name="debt"
          component={UdhaarListScreen}
          options={{
            tabBarLabel: t('debtTab'),
          }}
        />
        <Tab.Screen
          name="reports"
          component={ReportScreen}
          options={{
            tabBarLabel: t('reportsTab'),
          }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: t('settingsTab'),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigator;
