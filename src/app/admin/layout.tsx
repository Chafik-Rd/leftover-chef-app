"use client";

import {
  LayoutDashboard,
  Utensils,
  ShoppingBasket,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AsideSidebar } from "@/components/ui/aside";
import { AdminMenuItem } from "./_components/admin-menu-item";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AsideSidebar>
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-bold">LeftoverChef</h1>
          <p className="text-primary text-xs">Admin Dashboard</p>
        </div>

        <nav className="flex flex-col gap-3">
          <AdminMenuItem
            icon={<LayoutDashboard size={20} />}
            label="สรุปภาพรวม"
            path="/admin/dashboard"
          />
          <AdminMenuItem
            icon={<Utensils size={20} />}
            label="จัดการสูตรอาหาร"
            path="/admin/recipes"
          />
          <AdminMenuItem
            icon={<ShoppingBasket size={20} />}
            label="คลังวัตถุดิบ"
            path="/admin/ingredients"
          />
        </nav>

        {/* ปุ่ม Logout ด้านล่างสุด */}
        <div className="absolute right-6 bottom-8 left-6">
          <Button
            variant="ghost"
            className="text-primary/90 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">ออกจากระบบ</span>
          </Button>
        </div>
      </AsideSidebar>

      {/* 2. Main Content Area - ขยับไปทางขวาตามความกว้าง Sidebar */}
      <main className="ml-64 w-full p-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
