export type InventoryItem = {
  id: string;
  nameEn: string;
  nameHi: string;
  quantity: number;
  unit: string;
  category: string;
  pricePerUnit?: number;
  priceUnit?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  minStockAlert?: number;
  updatedAt?: string;
  totalSold?: number;
};

export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    nameEn: 'Sugar',
    nameHi: 'चीनी',
    quantity: 50,
    unit: 'kg',
    category: 'किराना',
    pricePerUnit: 45,
    priceUnit: 'kg',
    purchasePrice: 40,
    sellingPrice: 45,
    minStockAlert: 5,
    updatedAt: '12 May 2024',
    totalSold: 150,
  },
  {
    id: '2',
    nameEn: 'Rice',
    nameHi: 'चावल',
    quantity: 100,
    unit: 'kg',
    category: 'किराना',
    pricePerUnit: 60,
    priceUnit: 'kg',
    purchasePrice: 55,
    sellingPrice: 60,
    minStockAlert: 10,
    updatedAt: '14 May 2024',
    totalSold: 180,
  },
  {
    id: '3',
    nameEn: 'Powder',
    nameHi: 'चीनी पाउडर',
    quantity: 25,
    unit: 'kg',
    category: 'किराना',
    pricePerUnit: 50,
    priceUnit: 'kg',
    purchasePrice: 45,
    sellingPrice: 50,
    minStockAlert: 8,
    updatedAt: '10 May 2024',
    totalSold: 80,
  },
  {
    id: '4',
    nameEn: 'Mustard Oil',
    nameHi: 'सरसों तेल',
    quantity: 12,
    unit: 'L',
    category: 'किराना',
    pricePerUnit: 130,
    priceUnit: 'L',
    purchasePrice: 120,
    sellingPrice: 130,
    minStockAlert: 4,
    updatedAt: '11 May 2024',
    totalSold: 65,
  },
  {
    id: '5',
    nameEn: 'Tea',
    nameHi: 'चाय पत्ती',
    quantity: 40,
    unit: 'pack',
    category: 'किराना',
    pricePerUnit: 120,
    priceUnit: 'pack',
    purchasePrice: 110,
    sellingPrice: 120,
    minStockAlert: 6,
    updatedAt: '13 May 2024',
    totalSold: 58,
  },
  {
    id: '6',
    nameEn: 'Toor Dal',
    nameHi: 'दाल',
    quantity: 15,
    unit: 'kg',
    category: 'किराना',
    pricePerUnit: 110,
    priceUnit: 'kg',
    purchasePrice: 105,
    sellingPrice: 110,
    minStockAlert: 5,
    updatedAt: '15 May 2024',
    totalSold: 120,
  },
];
