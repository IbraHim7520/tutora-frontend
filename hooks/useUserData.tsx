"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface UserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
}

const useUserData = () => {
  const session = authClient.useSession(); // 👈 Hook top-level এ
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (session?.data?.user) {
      setUser(session.data.user as UserType);
    } else {
      setUser(null);
    }
  }, [session?.data?.user]);

  return {
    user,
    loading: session.isPending,   // better UX
    authenticated: !!session?.data?.user,
  };
};

export default useUserData;
