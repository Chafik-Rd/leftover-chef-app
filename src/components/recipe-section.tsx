import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { RecipeSectionProps } from "@/types/recipe.type";

export const RecipeSection = ({
  title,
  children,
  onAddClick,
  showAddButton = false,
}: RecipeSectionProps) => {
  return (
    <Card className="w-full p-7">
      <section className="flex items-center justify-between">
        <p className="text-3xl font-medium">{title}</p>
        {showAddButton && (
          <Button onClick={onAddClick}>
            <Plus />
            <span>เพิ่ม{title}</span>
          </Button>
        )}
      </section>
      {children}
    </Card>
  );
};
