"use client";

import { useEffect, useState } from "react";
import { CardRecipe } from "./card-recipe";
import { ReadAllRecipesMatchType } from "@/types/recipe.type";
import { RecipeService } from "@/services/recipe.service";
import Link from "next/link";
import { useUserIngreStore } from "@/store/user-ingredient.store";
import { useAuthStore } from "@/store/auth.store";

export const SectionRecipe = ({ layout }: { layout: boolean }) => {
  const [dbRecipes, setDbRecipes] = useState<ReadAllRecipesMatchType[]>([]);
  const { userIngredients } = useUserIngreStore();
  const { user } = useAuthStore();

  const recipesToShow = user === null ? [] : dbRecipes;

  // Fetch recipes match eith user from database
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user || userIngredients.length === 0) {
        setDbRecipes([]);
        return;
      }
      try {
        const response = await RecipeService.fetchAllRecipes();
        setDbRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [user, userIngredients]);

  return (
    <div
      className={`${
        layout
          ? "flex flex-col"
          : "grid auto-cols-min grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      } h-full w-full gap-6 overflow-y-auto`}
    >
      {recipesToShow.map((recipe) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
          <CardRecipe recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};
