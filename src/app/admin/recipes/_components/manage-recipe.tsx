"use client";

import { Button } from "@/components/ui/button";
import { RecipeTable } from "./recipeTable";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ReadAllRecipeType, RecipeLevel } from "@/types/recipe.type";
import { RecipeService } from "@/services/recipe.service";
import { SelectLevel } from "@/components/select-level";

export const ManageRecipe = () => {
  const [dbRecipes, setDbRecipes] = useState<ReadAllRecipeType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<RecipeLevel | "">("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.fetchAllRecipes();
        setDbRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("ต้องการลบสูตรอาหารนี้หรือไม่?")) return;
    try {
      await RecipeService.deleteRecipe(id);
      const response = await RecipeService.fetchAllRecipes();
      setDbRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <h2 className="text-primary text-3xl font-medium">จัดการสูตรอาหาร</h2>
        <Link href="/admin/recipes/create">
          <Button>
            <Plus className="mr-2" /> เพิ่มสูตรอาหารใหม่
          </Button>
        </Link>
      </header>
      <section className="flex items-center gap-5">
        <label className="relative w-full">
          <Search
            size={16}
            strokeWidth={2}
            className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
          />

          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาสูตรอาหาร..."
            className="my-4 w-full pl-8"
          />
        </label>

        <SelectLevel
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value as RecipeLevel)}
        />
      </section>
      {/* Table Section */}
      <RecipeTable
        recipes={dbRecipes}
        filterLevel={filterLevel}
        searchRecipe={searchTerm}
        onDeleteRecipe={handleDelete}
      />
    </>
  );
};
