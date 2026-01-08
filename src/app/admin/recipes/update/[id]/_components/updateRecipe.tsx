"use client";
import { ArrowLeft, Save } from "lucide-react";
import { UploadImage } from "../../../_components/uploadImage";
import { RecipeBasicInfo } from "../../../_components/recipeBasicInfo";
import { AddIngredient } from "../../../_components/addIngredient";
import { AddInstruction } from "../../../_components/addInstruction";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useParams } from "next/navigation";
import { validateRecipeForm } from "@/utils/recipeSection";
import { RecipeService } from "@/services/recipe.service";
import {
  CreateRecipeType,
  Ingredients,
  ReadRecipeByIdType,
  UpdateRecipeType,
} from "@/types/recipe.type";

const defaultIngredient: Ingredients = {
  name: "",
  amount: 0,
  unit: "piece",
};

export const UpdateRecipe = () => {
  const { id } = useParams();
  const [dbRecipe, setDbRecipe] =
    useState<ReadRecipeByIdType<Ingredients> | null>(null);
  const [form, setForm] = useState<CreateRecipeType>({
    name: "",
    description: "",
    calorie: 0,
    cookTime: 0,
    servings: 0,
    image: null,
    level: "easy",
    ingredients: [defaultIngredient],
    instructions: [""],
  });

  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch recipe by id
  useEffect(() => {
    const fetchRecipe = async () => {
      // setFistLoad(true);
      try {
        const response = await RecipeService.fetchRecipeById(Number(id));
        console.log(response.data);
        setDbRecipe(response.data);
        setForm(response.data);
      } catch (err) {
        console.error(err);
      }
      // finally {
      //   setFistLoad(false);
      // }
    };
    fetchRecipe();
  }, [id]);

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

  const getUpdatedData = () => {
    const updatedFields: UpdateRecipeType = {};

    (Object.keys(form) as Array<keyof CreateRecipeType>).forEach((key) => {
      const currentValue = form[key];
      const originalValue =
        dbRecipe?.[key as keyof ReadRecipeByIdType<Ingredients>];

      // Check for changes in field values
      const isImageChanged = key === "image" && currentValue instanceof File;
      const isDataChanged =
        JSON.stringify(currentValue) !== JSON.stringify(originalValue);

      if (isImageChanged || isDataChanged) {
        Object.assign(updatedFields, { [key]: currentValue });
      }
    });

    return updatedFields;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSaved) return;
    const dataToUpdate = getUpdatedData();

    // If no data changed, do not send update request
    if (Object.keys(dataToUpdate).length === 0) {
      console.log("ไม่มีข้อมูลเปลี่ยนแปลง");
      return;
    }
    setLoading(true);
    try {
      const response = await RecipeService.updateRecipe(
        Number(id),
        dataToUpdate,
      );

      console.log("Update recipe successfully:", response);
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
          imageURL={dbRecipe?.imageUrl || ""}
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
