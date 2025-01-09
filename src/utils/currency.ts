export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0093,
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const inINR = fromCurrency === 'INR' ? amount : amount / exchangeRates[fromCurrency as keyof typeof exchangeRates];
  return inINR * exchangeRates[toCurrency as keyof typeof exchangeRates];
};