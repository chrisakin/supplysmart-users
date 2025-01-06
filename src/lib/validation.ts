export const validatePhoneNumber = (phone: string): boolean => {
  // Nigerian phone number format: 11 digits starting with 0
  const phoneRegex = /^0[789][01]\d{8}$/;
  return phoneRegex.test(phone);
};

export const validatePin = (pin: string): boolean => {
  // 6-digit PIN
  const pinRegex = /^\d{6}$/;
  return pinRegex.test(pin);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};