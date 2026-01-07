"use client";

import { LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth.store";

export const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { user, logout } = useAuthStore();

  return (
    <nav className={`sticky top-0 z-50 ${isAdmin && "hidden"}`}>
      <div className="bg-background flex h-20 items-center justify-between px-8 py-4">
        <Link href="/">
          <p className="text-3xl font-bold">LeftoverChef</p>
        </Link>

        {!user ? (
          <Link href="/login">
            <Button>
              <UserRound />
              <span>เข้าสู่ระบบ</span>
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-5">
            {user.role === "admin" && (
              <Link href="/admin/dashboard">
                <Button
                  variant="destructive"
                  className="bg-red-100 text-red-500 hover:bg-red-200"
                >
                  <Settings />
                  <span>ผู้ดูแลระบบ</span>
                </Button>
              </Link>
            )}
            <div className="flex items-center gap-2 border-l pl-4">
              <div>
                <p className="text-muted-foreground text-sm">ยินดีตอนรับ,</p>
                <p className="text-primary">{user.firstName}</p>
              </div>
              <button
                onClick={logout}
                className="text-muted-foreground cursor-pointer hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
