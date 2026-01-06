"use client";

import { RecipeSection } from "@/components/recipe-section";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { unitsIngredients } from "@/data/constants";
import { IngredientService } from "@/services/ingredient.service";
import { AddIngredientProps, Ingredients } from "@/types/recipe.type";
import { handleAddItem, handleDeleteItem } from "@/utils/recipeSection";
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            <Popover
              open={activeIndex === index}
              onOpenChange={(isOpen) => setActiveIndex(isOpen ? index : null)}
            >
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Input
                    placeholder="ชื่อวัตถุดิบ"
                    value={ingredients[index].name}
                    onChange={(e) => {
                      updateIngredient(index, "name", e.target.value);
                      if (e.target.value.length > 0) setActiveIndex(index);
                    }}
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent
                className="p-0"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Command>
                  <CommandList>
                    <CommandEmpty>
                      <div className="flex flex-col items-center justify-center text-sm">
                        <p className="text-muted-foreground">
                          ไม่พบวัตถุดิบ {ingredients[index].name}
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-1 text-[#A67B5B]"
                          onClick={() => setActiveIndex(null)} // หรือจะเขียน logic เพิ่มลง DB ตรงนี้ก็ได้
                        >
                          + ใช้ชื่อนี้เป็นวัตถุดิบใหม่
                        </Button>
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {dbIngredients
                        .filter((i) => i.name.includes(ingredients[index].name))
                        .map((ingredient) => (
                          <CommandItem
                            key={ingredient.id}
                            value={ingredient.name}
                            onSelect={(currentValue) => {
                              updateIngredient(index, "name", currentValue);
                              setActiveIndex(null);
                            }}
                          >
                            {ingredient.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
            <NativeSelect
              value={ingredients[index].unit}
              onChange={(e) =>
                updateIngredient(
                  index,
                  "unit",
                  e.target.value as Ingredients["unit"],
                )
              }
              className="w-full min-w-30"
            >
              <NativeSelectOption value="">เลือกหน่วย</NativeSelectOption>
              {unitsIngredients.map((unit, index) => (
                <NativeSelectOption key={index} value={unit.value}>
                  {unit.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>

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
