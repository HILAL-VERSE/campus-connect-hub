-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all complaints" ON public.complaints;
DROP POLICY IF EXISTS "Users can view their own complaints" ON public.complaints;
DROP POLICY IF EXISTS "Users can create complaints" ON public.complaints;
DROP POLICY IF EXISTS "Admins can update all complaints" ON public.complaints;
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view feedback for their complaints" ON public.feedback;
DROP POLICY IF EXISTS "Users can create feedback for their complaints" ON public.feedback;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id;
$$;

-- Recreate profiles policies without recursion
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');

-- Recreate complaints policies
CREATE POLICY "Users can view their own complaints"
ON public.complaints
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create complaints"
ON public.complaints
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all complaints"
ON public.complaints
FOR SELECT
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all complaints"
ON public.complaints
FOR UPDATE
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');

-- Recreate feedback policies
CREATE POLICY "Users can view feedback for their complaints"
ON public.feedback
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.complaints
    WHERE complaints.id = feedback.complaint_id
    AND complaints.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create feedback for their complaints"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.complaints
    WHERE complaints.id = feedback.complaint_id
    AND complaints.user_id = auth.uid()
    AND complaints.status = 'resolved'
  )
);

CREATE POLICY "Admins can view all feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');