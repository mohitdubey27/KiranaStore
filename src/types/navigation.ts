export type RootStackParamList = {
  SplashScreen: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  InventoryScreen: undefined;
  UnitConverter: { selectedId?: string } | undefined;
  ItemSelect: {
    selectedId?: string;
    onSelect?: (id: string) => void;
  };
  AddItem: undefined;
  UdhaarList: undefined;
  CustomerDetails: { customerId?: string } | undefined;
  AddCustomer: { customerId?: string } | undefined;
  ProductDetail: { productId: string };

  CreateBill:
    | {
        __billItemDraft?: {
          itemId: string;
          qty: number;
          unit: string;
          pricePerUnit: number;
        };
      }
    | undefined;

  AddBillItem: { initialItemId?: string } | undefined;

  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  Profile: undefined;
  Register: undefined;

  TopSellingItems: undefined;

  SelectBrand: {
    selectedBrandId?: string;
    onSelect?: (brandId: string) => void;
  };
  SelectItemName: {
    selectedItemId?: string;
    onSelect?: (itemId: string) => void;
  };
};
