"use client";
import { Plus, Trash2 } from "lucide-react";
import { AsideSidebar } from "./ui/aside";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { UserIngredients } from "./user-ingredients";
import { useEffect } from "react";
import { UserIngredientService } from "@/services/user-ingredient.service";
import { useUserIngreStore } from "@/store/user-ingredient.store";

export const Sidebar = ({
  onSetIsUserIngre,
}: {
  onSetIsUserIngre: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const notActive = pathname.startsWith("/admin");
  const { userIngredients, setUserIngredient, removeUserIngre } =
    useUserIngreStore();

  useEffect(() => {
    const fetchUserIngredients = async () => {
      try {
        const response = await UserIngredientService.getUserIngredient();
        setUserIngredient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserIngredients();
  }, [setUserIngredient]);

  const handleDelete = async (id: number) => {
    try {
      await UserIngredientService.deleteUserIngredient(id);
      removeUserIngre(id);
      const response = await UserIngredientService.getUserIngredient();
      setUserIngredient(response.data);
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
        <Button onClick={()=>onSetIsUserIngre(true)}>
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
      {userIngredients && <UserIngredients onDelete={handleDelete} />}
    </AsideSidebar>
  );
};
