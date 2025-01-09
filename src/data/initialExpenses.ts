// Recent Expenses (Last 7 days)
const recentExpenses = [
  {
    id: '1',
    amount: 85000.00,
    originalAmount: 85000.00,
    originalCurrency: 'INR',
    category: 'Housing',
    date: '2024-03-15',
    description: 'Monthly Rent Payment - 3BHK Apartment'
  },
  {
    id: '2',
    amount: 12500.00,
    originalAmount: 12500.00,
    originalCurrency: 'INR',
    category: 'Transportation',
    date: '2024-03-14',
    description: 'Annual Car Insurance Premium'
  },
  {
    id: '3',
    amount: 35000.00,
    originalAmount: 35000.00,
    originalCurrency: 'INR',
    category: 'Education',
    date: '2024-03-13',
    description: 'Advanced Data Science Course'
  },
  {
    id: '4',
    amount: 7500.00,
    originalAmount: 7500.00,
    originalCurrency: 'INR',
    category: 'Healthcare',
    date: '2024-03-12',
    description: 'Quarterly Health Checkup'
  }
];

// Last Week Expenses
const lastWeekExpenses = [
  {
    id: '5',
    amount: 15000.00,
    originalAmount: 15000.00,
    originalCurrency: 'INR',
    category: 'Shopping',
    date: '2024-12-01',
    description: 'New Smartphone Purchase'
  },
  {
    id: '6',
    amount: 8500.00,
    originalAmount: 8500.00,
    originalCurrency: 'INR',
    category: 'Entertainment',
    date: '2024-12-02',
    description: 'Concert Tickets'
  },
  {
    id: '7',
    amount: 4500.00,
    originalAmount: 4500.00,
    originalCurrency: 'INR',
    category: 'Food & Dining',
    date: '2024-12-01',
    description: 'Weekly Grocery Shopping'
  },
  {
    id: '8',
    amount: 2000.00,
    originalAmount: 2000.00,
    originalCurrency: 'INR',
    category: 'Bills & Utilities',
    date: '2024-12-02',
    description: 'Internet Bill Payment'
  }
];

// Last Month Expenses
const lastMonthExpenses = [
  {
    id: '9',
    amount: 45000.00,
    originalAmount: 45000.00,
    originalCurrency: 'INR',
    category: 'Travel',
    date: '2024-02-15',
    description: 'Weekend Getaway to Goa'
  },
  {
    id: '10',
    amount: 25000.00,
    originalAmount: 25000.00,
    originalCurrency: 'INR',
    category: 'Education',
    date: '2024-02-10',
    description: 'Professional Certification Fee'
  },
  {
    id: '11',
    amount: 18000.00,
    originalAmount: 18000.00,
    originalCurrency: 'INR',
    category: 'Healthcare',
    date: '2024-02-05',
    description: 'Dental Treatment'
  },
  {
    id: '12',
    amount: 9500.00,
    originalAmount: 9500.00,
    originalCurrency: 'INR',
    category: 'Shopping',
    date: '2024-02-01',
    description: 'Winter Clothing Shopping'
  }
];

// Last Year Expenses
const lastYearExpenses = [
  {
    id: '13',
    amount: 150000.00,
    originalAmount: 150000.00,
    originalCurrency: 'INR',
    category: 'Travel',
    date: '2024-09-15',
    description: 'International Vacation'
  },
  {
    id: '14',
    amount: 75000.00,
    originalAmount: 75000.00,
    originalCurrency: 'INR',
    category: 'Education',
    date: '2024-07-20',
    description: 'Online Degree Program'
  },
  {
    id: '15',
    amount: 95000.00,
    originalAmount: 95000.00,
    originalCurrency: 'INR',
    category: 'Housing',
    date: '2024-05-10',
    description: 'Home Renovation'
  },
  {
    id: '16',
    amount: 55000.00,
    originalAmount: 55000.00,
    originalCurrency: 'INR',
    category: 'Healthcare',
    date: '2024-03-01',
    description: 'Medical Insurance Premium'
  }
];


export const initialExpenses = [
  ...recentExpenses,
  ...lastWeekExpenses,
  ...lastMonthExpenses,
  ...lastYearExpenses
];