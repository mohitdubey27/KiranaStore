import { isBrandApplicableForItem } from './brandApplicability';

describe('brand applicability', () => {
  it('returns false for loose or unbranded items in English and Hindi', () => {
    expect(isBrandApplicableForItem('Sugar')).toBe(false);
    expect(isBrandApplicableForItem('चीनी')).toBe(false);
    expect(isBrandApplicableForItem('Potato')).toBe(false);
    expect(isBrandApplicableForItem('आलू')).toBe(false);
    expect(isBrandApplicableForItem('Onion')).toBe(false);
    expect(isBrandApplicableForItem('प्याज')).toBe(false);
    expect(isBrandApplicableForItem('Daal')).toBe(false);
    expect(isBrandApplicableForItem('दाल')).toBe(false);
    expect(isBrandApplicableForItem('Arhar Dal')).toBe(false);
    expect(isBrandApplicableForItem('अरहर दाल')).toBe(false);
  });

  it('returns true for branded packaged items in English and Hindi', () => {
    expect(isBrandApplicableForItem('Tea')).toBe(true);
    expect(isBrandApplicableForItem('चाय पत्ती')).toBe(true);
    expect(isBrandApplicableForItem('Detergent Powder')).toBe(true);
    expect(isBrandApplicableForItem('डिटर्जेंट पाउडर')).toBe(true);
  });
});
