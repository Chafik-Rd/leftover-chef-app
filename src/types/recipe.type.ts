export interface RecipeSectionProps {
  title: string;
  children: React.ReactNode;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

// All units
export const INGREDIENT_UNITS = [
  "g",
  "kg",
  "l",
  "ml",
  "tbsp",
  "tsp",
  "piece",
] as const;

// Create type from array
export type IngredientUnit = (typeof INGREDIENT_UNITS)[number];

// All recipe levels
export const RECIPE_LEVEL = ["easy", "medium", "hard"] as const;

// Create type from array
export type RecipeLevel = (typeof RECIPE_LEVEL)[number];

export type Ingredients = {
  name: string;
  amount: number;
  unit: IngredientUnit;
};

// Type for creating a recipe
export interface CreateRecipeType {
  name: string;
  description: string;
  calorie: number;
  cookTime: number;
  servings: number;
  image: File | null;
  level: RecipeLevel;
  ingredients: Ingredients[];
  instructions: string[];
}

// Props for adding ingredients and instructions components
export interface AddIngredientProps {
  ingredients: Ingredients[];
  onSetIngredients: (ingredients: Ingredients[]) => void;
  defaultIngredient: Ingredients;
}
export interface AddInstructionsProps {
  instructions: string[];
  onSetInstructions: (instructions: string[]) => void;
}

// Type for read all recipe
export interface ReadAllRecipeType {
  id: number;
  name: string;
  cookTime: number;
  level: RecipeLevel;
  imageUrl: string;
  calorie: number;
  servings: number;
}

// Type for read recipe by id
export interface ReadRecipeByIdType extends ReadAllRecipeType {
  description: string;
  ingredients: Ingredients[];
  instructions: string[];
}

// Props for recipe table component
export interface RcipeTableProps {
  recipes: ReadAllRecipeType[];
  filterLevel?: RecipeLevel | "";
  searchRecipe?: string;
  onDeleteRecipe: (id: number) => void;
}

//Type for update recipe
export type UpdateRecipeType = Partial<CreateRecipeType>;

export interface ReadAllRecipesMatchType extends ReadAllRecipeType {
  ingredients: Ingredients[];
  matchPercentage: number;
  ingredientsSummary: {
    available: string[];
    missing: string[];
    missingCount: number;
  };
  isFullyMatch: boolean;
}
