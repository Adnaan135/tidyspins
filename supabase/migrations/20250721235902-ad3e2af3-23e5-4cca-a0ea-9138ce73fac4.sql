-- Check and fix RLS policies for bookings table
-- First, drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;

-- Recreate the insert policy to ensure it works correctly
CREATE POLICY "allow_insert_bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Recreate the select policy for public viewing
CREATE POLICY "allow_view_bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Recreate admin policies (checking profiles table for admin status)
CREATE POLICY "admin_view_all_bookings" 
ON public.bookings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

CREATE POLICY "admin_update_bookings" 
ON public.bookings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Ensure RLS is enabled
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;