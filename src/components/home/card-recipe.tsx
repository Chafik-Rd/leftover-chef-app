import Image from "next/image";
import { Card } from "../ui/card";
import { Clock, Flame, Heart, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ReadAllRecipesMatchType } from "@/types/recipe.type";
import { levelsRecipes } from "@/data/constants";
import { getLabel } from "@/utils/recipeSection";

const colorRecipeLevel: Record<string, string> = {
  easy: "bg-difficulty-easy-bg text-difficulty-easy",
  medium: "bg-difficulty-medium-bg text-difficulty-medium",
  hard: "bg-difficulty-hard-bg text-difficulty-hard",
};
export const CardRecipe = ({ recipe }: { recipe: ReadAllRecipesMatchType }) => {
  const displayLevel = getLabel(recipe.level, levelsRecipes);

  return (
    <Card className="w-full min-w-65 overflow-hidden p-0 hover:shadow-lg">
      <div className="relative h-44">
        <Image
          src="https://res.cloudinary.com/dk4pdticm/image/upload/v1766992088/leftover_recipes/hlacyiwuxmxjghzo8qur.png"
          alt="image"
          fill
          className="object-cover"
        />

        {/* Favorite button */}
        <Button
          variant="ghost"
          className="absolute top-2 right-2 rounded-full bg-white/50 p-2"
        >
          <Heart size={18} />
        </Button>

        {/* Recipe level */}
        <Badge
          className={`absolute bottom-2 left-2 ${colorRecipeLevel[recipe.level]}`}
        >
          {displayLevel}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{recipe.name}</h3>
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {recipe.cookTime} นาที
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} />
            {recipe.servings} ที่
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} />
            {recipe.calorie} kcal
          </span>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {/* ส่วนสรุปสถานะ: ทำให้ดูง่ายที่สุด */}
          <div className="flex items-center gap-2">
            {/* ถ้าวัตถุดิบครบ */}
            {recipe.isFullyMatch ? (
              <Badge className="bg-difficulty-easy-bg text-difficulty-easy border-none text-xs">
                พร้อมปรุงทันที
              </Badge>
            ) : (
              //  ถ้าขาดบางส่วน
              <span className="text-difficulty-hard-bg text-xs font-medium">
                ขาดวัตถุดิบอีก {recipe.ingredientsSummary.missingCount} อย่าง
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
    // <Card className="w-full min-w-65 overflow-hidden p-0 animate-pulse">
    //   <div className="relative h-44 bg-gray-200" />
    //   <div className="flex flex-col gap-3 p-4">
    //     <div className="h-6 w-3/4 rounded bg-gray-200" />
    //     <div className="flex gap-4">
    //       <div className="h-4 w-16 rounded bg-gray-200" />
    //       <div className="h-4 w-16 rounded bg-gray-200" />
    //     </div>
    //   </div>
    // </Card>
  );
};
