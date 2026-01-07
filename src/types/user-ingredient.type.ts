import { IngredientUnit } from "./recipe.type";

export interface CreateUserIngredientType {
  name: string;
  amount: number;
  unit: IngredientUnit;
  expiryDate: string;
}
export interface ReadUserIngredientType extends CreateUserIngredientType {
  id: number;
}

// Props for user ingredient components
export interface UserIngredientsProps {
  onDelete: (id: number) => void;
}

export type FormUserIngredientType = Omit<
  CreateUserIngredientType,
  "expiryDate"
> & {
  expiryDate?: Date;
};
