export type Preset = { label: string; amount: string; unit?: string };

export const DEFAULT_AMOUNT = '250';

export const weightPresets: Preset[] = [
  { label: '100 g', amount: '100', unit: 'g' },
  { label: '250 g', amount: '250', unit: 'g' },
  { label: '500 g', amount: '500', unit: 'g' },
  { label: '1 kg', amount: '1', unit: 'kg' },
  { label: '2 kg', amount: '2', unit: 'kg' },
  { label: '5 kg', amount: '5', unit: 'kg' },
];

export const cashPresets: Preset[] = [
  { label: '₹10', amount: '10' },
  { label: '₹50', amount: '50' },
  { label: '₹100', amount: '100' },
  { label: '₹200', amount: '200' },
  { label: '₹500', amount: '500' },
  { label: '₹1000', amount: '1000' },
];
