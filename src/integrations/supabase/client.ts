
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yplyhblbttuwalgzxsow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbHloYmxidHR1d2FsZ3p4c293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTkxOTIsImV4cCI6MjA1Nzg3NTE5Mn0.Ua71jZ7hj3BoYtX76w2ZhpICHwXw4Yy8IuoNYUyrCRc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
