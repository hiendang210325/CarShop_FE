export const validators = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{8,15}$/;
    return phoneRegex.test(phone.trim());
  },

  isValidVIN(vin: string): boolean {
    return vin.trim().length === 17;
  },

  isNotEmpty(value?: string | null): boolean {
    return Boolean(value && value.trim().length > 0);
  },

  isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && !isNaN(value) && value > 0;
  },
};
