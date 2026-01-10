import Image from "next/image";
import { Card } from "../ui/card";
import { Clock, CookingPot, Flame, Heart, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { AllowedCardData, CardRecipeProps } from "@/types/recipe.type";
import { levelsRecipes } from "@/data/constants";
import { getLabel } from "@/utils/recipeSection";

const colorRecipeLevel: Record<string, string> = {
  easy: "bg-difficulty-easy-bg text-difficulty-easy",
  medium: "bg-difficulty-medium-bg text-difficulty-medium",
  hard: "bg-difficulty-hard-bg text-difficulty-hard",
};

export const CardRecipe = <T extends AllowedCardData>({
  recipe,
}: {
  recipe: CardRecipeProps<T> | null;
}) => {
  const displayLevel = recipe ? getLabel(recipe.level, levelsRecipes) : "";

  return (
    <>
      {recipe ? (
        <Card className="w-full min-w-65 gap-0 overflow-hidden p-0 hover:shadow-lg">
          <div className="relative h-44">
            <Image
              src="https://res.cloudinary.com/dk4pdticm/image/upload/v1766992088/leftover_recipes/hlacyiwuxmxjghzo8qur.png"
              alt="image"
              fill
              className="aspect-video object-cover"
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

            {/* Status ingredient */}
            {"isFullyMatch" in recipe ? (
              <div className="flex items-center gap-2">
                {recipe.isFullyMatch ? (
                  // Available
                  <Badge className="bg-difficulty-easy-bg text-difficulty-easy border-none text-xs">
                    พร้อมปรุงทันที
                  </Badge>
                ) : (
                  //  Insufficient
                  <span className="text-difficulty-hard-bg text-xs font-medium">
                    ขาดวัตถุดิบอีก {recipe.ingredientsSummary.missingCount}{" "}
                    อย่าง
                  </span>
                )}
              </div>
            ) : "ingredientCount" in recipe ? (
              // Low Ingredient
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="border-none bg-blue-50 text-xs text-blue-600"
                >
                  ใช้วัตถุดิบเพียง {recipe.ingredientCount} อย่าง
                </Badge>
              </div>
            ) : null}

            {
              <div className="text-muted-foreground/70 mt-auto flex items-center justify-end gap-1 text-xs">
                {"viewCount" in recipe && (
                  <div className="flex items-center gap-1">
                    <CookingPot size={12} />
                    <span>{recipe.viewCount?.toLocaleString()} วิว</span>
                  </div>
                )}
                {"cookingCount" in recipe && (
                  <div className="flex items-center gap-1">
                    <CookingPot size={12} />
                    <span>
                      ทำแล้ว {recipe.cookingCount?.toLocaleString()} ครั้ง
                    </span>
                  </div>
                )}
              </div>
            }
          </div>
        </Card>
      ) : (
        <Card className="w-full min-w-65 animate-pulse overflow-hidden p-0">
          <div className="relative h-44 bg-gray-200" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="flex gap-4">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
