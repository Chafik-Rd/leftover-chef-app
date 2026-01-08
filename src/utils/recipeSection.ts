import { CreateRecipeType } from "@/types/recipe.type";

// Add item recipe section
export const handleAddItem = <T>(
  list: T[],
  onSetList: (newList: T[]) => void,
  newItem: T,
) => {
  onSetList([...list, newItem]);
};

// Delete item recipe section
export const handleDeleteItem = <T>(
  list: T[],
  onSetList: (newList: T[]) => void,
  index: number,
) => {
  const newList = list.filter((_, i) => i !== index);
  if (newList.length === 0) return;
  onSetList(newList);
};

// Validate recipe form
export const validateRecipeForm = (form: CreateRecipeType) => {
  // Check image data
  const hasImage = form.image !== null;

  // Check basic info
  const hasBasicInfo =
    form.name.trim() !== "" &&
    form.description.trim() !== "" &&
    form.calorie > 0 &&
    form.cookTime > 0 &&
    form.servings > 0 &&
    form.level.trim() !== "";

  // Check ingredients
  const hasIngredients =
    form.ingredients.length > 0 &&
    form.ingredients.every(
      (ing) =>
        ing.name.trim() !== "" && ing.amount > 0 && ing.unit.trim() !== "",
    );
  // Check instructions
  const hasInstructions =
    form.instructions.length > 0 &&
    form.instructions.every((ing) => ing.trim() !== "");

  return hasImage && hasBasicInfo && hasIngredients && hasInstructions;
};

// Label for display
export const getLabel = (
  value: string,
  lists: Array<{ label: string; value: string }>,
) => {
  return lists.find((list) => list.value === value)?.label || value;
};
