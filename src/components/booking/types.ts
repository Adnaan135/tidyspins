
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
  paymentIntentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export interface EmailUpdate {
  emailId: string;
  scheduleTime?: string;
  cancel?: boolean;
}

export interface BookingData {
  id: string;
  created_at: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string | null;
  payment_method: string;
  status: string | null;
  service: string;
}
