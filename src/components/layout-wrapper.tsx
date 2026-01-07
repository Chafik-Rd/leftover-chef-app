"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <Navbar isAdmin={isAdmin} />
      {children}
    </div>
  );
};
