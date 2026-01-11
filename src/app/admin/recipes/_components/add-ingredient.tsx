"use client";

import { InputIngredient } from "@/components/input-Ingredient";
import { RecipeSection } from "@/components/recipe-section";
import { SelectUnit } from "@/components/select-unit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IngredientService } from "@/services/ingredient.service";
import { AddIngredientProps, Ingredients } from "@/types/recipe.type";
import { handleAddItem, handleDeleteItem } from "@/utils/recipe-section";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const AddIngredient = ({
  ingredients,
  onSetIngredients,
  defaultIngredient,
}: AddIngredientProps) => {
  const [dbIngredients, setDbIngredients] = useState<
    { id: number; name: string }[]
  >([]);


  // Read ingredient from database
  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await IngredientService.getAllIngredient();
      setDbIngredients(response.data);
    };
    fetchIngredients();
  }, []);

  // Update data in ingredient section
  const updateIngredient = <T extends keyof Ingredients>(
    index: number,
    key: T,
    value: Ingredients[T],
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [key]: value };
    onSetIngredients(newIngredients);
  };
  return (
    <RecipeSection
      title="วัตถุดิบ"
      showAddButton={true}
      onAddClick={() =>
        handleAddItem(ingredients, onSetIngredients, defaultIngredient)
      }
    >
      <section className="flex flex-col gap-4">
        {ingredients.map((_, index) => (
          <div
            key={index}
            className="bg-background flex items-center gap-4 rounded-md p-3"
          >
            <div className="bg-secondary-surface flex items-center justify-center rounded-full text-xl font-medium">
              <p className="h-8 w-8 text-center">{index + 1}</p>
            </div>
            <InputIngredient
              value={ingredients[index].name}
              onChangeValue={(newName) =>
                updateIngredient(index, "name", newName)
              }
              dbIngredients={dbIngredients}
            />

            <Input
              type="number"
              min={0}
              value={ingredients[index].amount}
              onChange={(e) =>
                updateIngredient(index, "amount", Number(e.target.value))
              }
              placeholder="ปริมาณ"
              className="w-1/4"
            />
            <SelectUnit
              value={ingredients[index].unit}
              onChange={(e) =>
                updateIngredient(
                  index,
                  "unit",
                  e.target.value as Ingredients["unit"],
                )
              }
            />

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                handleDeleteItem(ingredients, onSetIngredients, index)
              }
            >
              <X />
            </Button>
          </div>
        ))}
      </section>
    </RecipeSection>
  );
};
