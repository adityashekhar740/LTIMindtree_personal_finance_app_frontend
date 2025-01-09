export const isValidDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate <= today;
};

export const getDateRange = (range: string): { startDate: string; endDate: string } => {
  const today = new Date();
  const startDate = new Date();
  
  switch (range) {
    case 'week':
      startDate.setDate(today.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(today.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(today.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    default:
      startDate.setDate(today.getDate() - 30); // Default to last 30 days
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  };
};