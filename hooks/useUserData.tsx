"use client";

import { authClient } from "@/lib/auth-client";

// Tip: Usually auth-client types are exported, but we'll keep your interface
interface UserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  role: string;
  image?: string | null;
}

const useUserData = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user ? (session.user as UserType) : null;
  const authenticated = !!session?.user;

  return {
    user,
    loading: isPending,
    authenticated,
    error, 
  };
};

export default useUserData;