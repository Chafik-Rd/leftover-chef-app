import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { UserIngredientsProps } from "@/types/user-ingredient.type";
import { unitsIngredients } from "@/data/constants";
import { useUserIngreStore } from "@/store/user-ingredient.store";
import { getLabel } from "@/utils/recipeSection";

export const UserIngredients = ({ onDelete }: UserIngredientsProps) => {
  const { userIngredients } = useUserIngreStore();
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      {userIngredients.map((userIngre) => {
        const displayUnit = getLabel(userIngre.unit, unitsIngredients);

        return (
          <Card
            key={userIngre.id}
            className="border-border relative w-full border p-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-foreground font-bold">{userIngre.name}</p>
              <div className="flex items-center justify-between">
                <Badge>
                  {userIngre.amount} {displayUnit}
                </Badge>
                <div className="flex flex-col items-end">
                  <span className="text-muted-foreground text-xs">
                    วันหมดอายุ
                  </span>
                  <span className="text-primary text-xs font-medium">
                    {userIngre.expiryDate
                      ? new Date(userIngre.expiryDate).toLocaleDateString(
                          "th-TH",
                        )
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(userIngre.id)}
              className="bg-muted-foreground/50 absolute -top-1 -right-2 cursor-pointer rounded-full p-1"
            >
              <X size={12} strokeWidth={3} />
            </button>
          </Card>
        );
      })}
    </div>
  );
};
