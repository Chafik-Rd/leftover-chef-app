"use client";

import { useEffect, useState } from "react";
import { CardRecipe } from "./card-recipe";
import { ReadAllRecipesMatchType } from "@/types/recipe.type";
import { RecipeService } from "@/services/recipe.service";
import Link from "next/link";
import { useUserIngreStore } from "@/store/user-ingredient.store";

export const SectionRecipe = ({ layout }: { layout: boolean }) => {
  const [dbRecipes, setDbRecipes] = useState<ReadAllRecipesMatchType[]>([]);
  const { userIngredients } = useUserIngreStore();

  // Fetch recipes match eith user from database
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.fetchAllRecipesMatch();
        setDbRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [userIngredients]);

  return (
    <div
      className={`${
        layout
          ? "flex flex-col"
          : "grid auto-cols-min grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      } h-full w-full gap-6 overflow-y-auto`}
    >
      {dbRecipes.map((recipe) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="h-fit">
          <CardRecipe recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};
