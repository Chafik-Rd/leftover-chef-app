"use client";

import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncProfile = async () => {
      try {
        const response = await UserService.getUserProfile();
        setUser(response.data);
      } catch {
        // If error eg. Token exเช่น Token expired
        logout();
      } finally {
        setIsReady(true);
      }
    };
    syncProfile();
  }, [setUser, logout]);

  useEffect(() => {
    if (!isReady) return;

    const isAdminPath = pathname.startsWith("/admin");
    if (isAdminPath) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, pathname, router, isReady]);

  return <>{children}</>;
};
