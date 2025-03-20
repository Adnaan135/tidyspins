
export interface FormData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: string;
  scheduleEmailFor: string;
  useTestEmail: boolean;
}

export interface EmailUpdate {
  emailId: string;
  scheduleTime?: string;
  cancel?: boolean;
}
