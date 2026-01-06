"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminMenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const AdminMenuItem = ({ icon, label, path }: AdminMenuItemProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(path);

  return (
    <Link
      href={path}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
        isActive
          ? "bg-primary text-white shadow-md"
          : "hover:bg-background text-primary"
      } `}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};
