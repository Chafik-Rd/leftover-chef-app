"use client";
import { ArrowLeft, Save } from "lucide-react";
import { UploadImage } from "../../_components/upload-image";
import { RecipeBasicInfo } from "../../_components/recipe-basic-info";
import { AddIngredient } from "../../_components/add-ingredient";
import { AddInstruction } from "../../_components/add-instruction";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRecipeForm } from "@/utils/recipe-section";
import { CreateRecipeType, Ingredients } from "@/types/recipe.type";
import { RecipeService } from "@/services/recipe.service";

export const CreateRecipe = () => {
  const defaultIngredient: Ingredients = {
    name: "",
    amount: 0,
    unit: "piece",
  };
  const defaultForm: CreateRecipeType = {
    name: "",
    description: "",
    calorie: 0,
    cookTime: 0,
    servings: 0,
    image: null,
    level: "easy",
    ingredients: [defaultIngredient],
    instructions: [""],
  };
  const [form, setForm] = useState<CreateRecipeType>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const updateForm = <T extends keyof CreateRecipeType>(
    key: T,
    value: CreateRecipeType[T],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Validate form empty fields
  useEffect(() => {
    setIsSaved(validateRecipeForm(form));
  }, [form]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSaved) return;
    setLoading(true);

    try {
      const response = await RecipeService.createRecipe(form);

      if (response.success) setForm(defaultForm);
      console.log("Recipe created successfully:", response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 px-8 py-2">
      <Link href="/admin/recipes" className="w-full">
        <section className="flex w-full items-center gap-2">
          <ArrowLeft />
          <p>ย้อนกลับ</p>
        </section>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-300 flex-col items-center gap-6"
      >
        <UploadImage
          isImage={form.image ? true : false}
          onImageChange={(file) => updateForm("image", file)}
        />
        <RecipeBasicInfo data={form} onChange={updateForm} />
        <AddIngredient
          ingredients={form.ingredients}
          onSetIngredients={(newIng) => updateForm("ingredients", newIng)}
          defaultIngredient={defaultIngredient}
        />
        <AddInstruction
          instructions={form.instructions}
          onSetInstructions={(newIng) => updateForm("instructions", newIng)}
        />
        <Button type="submit" disabled={!isSaved || loading}>
          <Save />
          <span>{loading ? "กำลังบันทึก..." : "บันทึก"}</span>
        </Button>
      </form>
    </div>
  );
};
