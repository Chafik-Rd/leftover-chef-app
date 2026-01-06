import { UserRound } from "lucide-react";
import Link from "next/link";
export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20">
      <div className="bg-background flex h-20 items-center justify-between px-8 py-4">
        <Link href="/">
          <p className="text-4xl font-bold">LeftoverChef</p>
        </Link>
        <Link href="/login">
          <UserRound />
        </Link>
      </div>
    </nav>
  );
};
