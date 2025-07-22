import { supabase } from '@/integrations/supabase/client';

// Quick admin promotion script
export const promoteUserToAdmin = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('promote-to-admin', {
      body: { email }
    });

    if (error) {
      console.error('Error promoting user:', error);
      return { success: false, error: error.message };
    }

    console.log('User promoted successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Auto-promote the specific user
promoteUserToAdmin('adnaanabdulkarim135@gmail.com')
  .then(result => {
    if (result.success) {
      console.log('✅ Admin promotion successful!');
    } else {
      console.error('❌ Admin promotion failed:', result.error);
    }
  });