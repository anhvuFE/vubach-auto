export interface ContactInfo {
  phone: string;
  address: string;
  email?: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social?: {
    facebook?: string;
    zalo?: string;
    youtube?: string;
  };
}