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

// All recipe match status
export const RECIPE_MATCH_STATUS = [
  "available",
  "insufficient",
  "missing",
] as const;

// Create type from array
export type RecipeMatchStatus = (typeof RECIPE_MATCH_STATUS)[number];

export type Ingredients = {
  name: string;
  amount: number;
  unit: IngredientUnit;
};

export type IngredientsMatch = {
  name: string;
  requiredAmount: string;
  unit: IngredientUnit;
  status: RecipeMatchStatus;
  currentStock: number;
  shortageAmount: number;
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
export interface BaseRecipeDetailType extends ReadAllRecipeType {
  description: string;
  instructions: string[];
}
export interface ReadRecipeByIdType<T> extends BaseRecipeDetailType {
  ingredients: T[];
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

export interface MatchInfo {
  matchPercentage: number;
  ingredientsSummary: {
    available: string[];
    missing: string[];
    missingCount: number;
  };
  isFullyMatch: boolean;
}

export interface ReadAllRecipesMatchType extends ReadAllRecipeType, MatchInfo {
  ingredients: Ingredients[];
}

export interface BaseCardProps extends ReadAllRecipeType {
  className?: string;
}
export interface RecipeStats {
  cookingCount?: number;
  ingredientCount?: number;
  viewCount?: number;
}

export type CardRecipeProps<T> = BaseCardProps & T;

export type AllowedCardData = MatchInfo | RecipeStats

export type TrendingRecipe = ReadAllRecipeType & { viewCount: number };
export type LowIngreRecipe = ReadAllRecipeType & { ingredientCount: number };
export type FavoriteRecipe = ReadAllRecipeType & { cookingCount: number };
