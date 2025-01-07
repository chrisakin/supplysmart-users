export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export const formatCurrency = (value: string) => {
  // Remove all non-digit characters
  const numericValue = value.replace(/[^\d]/g, '');
  
  // Convert to number and format
  const amount = Number(numericValue) / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

export const formatAmountWhileTyping = (value: string) => {
  // Remove any existing formatting
  const cleanValue = value.replace(/[^\d]/g, '');
  
  if (!cleanValue) return '';
  
  // Add proper decimal point position
  const length = cleanValue.length;
  const withDecimal = length <= 2 
    ? `0.${cleanValue.padStart(2, '0')}` 
    : `${cleanValue.slice(0, length - 2)}.${cleanValue.slice(length - 2)}`;
    
  // Format with Nigerian Naira
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(withDecimal));
};

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}