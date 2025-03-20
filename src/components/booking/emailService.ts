
import { supabase } from "@/integrations/supabase/client";
import { EmailUpdate } from "./types";

export const updateScheduledEmail = async (updateData: EmailUpdate): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-booking-confirmation/update-email', {
      body: {
        emailId: updateData.emailId,
        ...updateData
      }
    });

    if (error) {
      throw new Error("Failed to update email: " + error.message);
    }

    console.log("Email update response:", data);
    return data;
    
  } catch (error) {
    console.error("Email update error:", error);
    throw error;
  }
};
