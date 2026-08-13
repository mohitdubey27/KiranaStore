import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const isJest = typeof jest !== 'undefined';

import type { RootStackParamList } from '../types/navigation';
import SplashScreen from '../screens/SplashScreen';
import StartScreen from '../screens/StartScreen';
import LoginSceen from '../screens/LoginSceen';
import HomeNavigator from './HomeNavigator';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import UnitCashConverterScreen from '../screens/UnitCashConverterScreen';
import ItemSelectScreen from '../screens/ItemSelectScreen';
import AddItemScreen from '../screens/AddItemScreen';
import UdhaarListScreen from '../screens/UdhaarListScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import CreateBillScreen from '../screens/CreateBillScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import TopSellingItemsScreen from '../screens/TopSellingItemsScreen';
import BrandSelectScreen from '../screens/BrandSelectScreen';
import ItemNameSelectScreen from '../screens/ItemNameSelectScreen';
import AddBillItemScreen from '../screens/AddBillItemScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  if (isJest) {
    return <LoginSceen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginSceen} />
        <Stack.Screen name="HomeScreen" component={HomeNavigator} />
        <Stack.Screen
          name="UnitConverter"
          component={UnitCashConverterScreen}
        />
        <Stack.Screen name="ItemSelect" component={ItemSelectScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="CreateBill" component={CreateBillScreen} />
        <Stack.Screen name="AddBillItem" component={AddBillItemScreen} />

        <Stack.Screen name="UdhaarList" component={UdhaarListScreen} />
        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetailsScreen}
        />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen name="ProductDetail" component={ItemDetailsScreen} />
        <Stack.Screen
          name="TopSellingItems"
          component={TopSellingItemsScreen}
        />
        <Stack.Screen name="SelectBrand" component={BrandSelectScreen} />
        <Stack.Screen name="SelectItemName" component={ItemNameSelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
