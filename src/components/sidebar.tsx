"use client";
import { Plus, Refrigerator, Trash2 } from "lucide-react";
import { AsideSidebar } from "./ui/aside";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { UserIngredients } from "./user-ingredients";
import { useEffect } from "react";
import { UserIngredientService } from "@/services/user-ingredient.service";
import { useUserIngreStore } from "@/store/user-ingredient.store";
import { useAuthStore } from "@/store/auth.store";

export const Sidebar = ({
  onSetIsUserIngre,
}: {
  onSetIsUserIngre: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const notActive = pathname.startsWith("/admin");
  const { userIngredients, fetchIngredients, removeUserIngre } =
    useUserIngreStore();
  const { user } = useAuthStore();

  // Fetch user ingredient from database
  useEffect(() => {
    const fetchUserIngredients = async () => {
      if (user === null) return;
      await fetchIngredients();
    };
    fetchUserIngredients();
  }, [user, fetchIngredients]);

  const handleDelete = async (id: number) => {
    try {
      const response = await UserIngredientService.deleteUserIngredient(id);
      if (response.success) removeUserIngre(id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AsideSidebar
      className={`top-20 flex flex-col p-0 ${notActive && "hidden"}`}
    >
      <div className="border-border/30 flex flex-col gap-4 border-b p-4">
        <p className="text-foreground text-2xl font-medium">วัตถุดิบของฉัน</p>
        <Button onClick={() => onSetIsUserIngre(true)}>
          <Plus />
          <span>เพิ่มวัตถุดิบ</span>
        </Button>
        <Button
          variant="ghost"
          className="text-muted-foreground mr-0 ml-auto w-fit"
        >
          <Trash2 />
          <span>ล้างทั้งหมด</span>
        </Button>
      </div>
      {/* User ingredients */}
      {userIngredients.length > 0 ? (
        <UserIngredients onDelete={handleDelete} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 px-6 py-12 opacity-40">
          {/* เลือกใช้ Icon จาก Lucide ที่คุณมีอยู่แล้ว */}
          <div className="rounded-full bg-slate-100 p-4">
            <Refrigerator size={60} strokeWidth={1.5} className="text-slate-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600">
              ตู้เย็นยังว่างอยู่
            </p>
            <p className="text-xs text-slate-400">
              เพิ่มวัตถุดิบเพื่อเริ่มปรุงเมนูอร่อย
            </p>
          </div>
        </div>
      )}
    </AsideSidebar>
  );
};
