import { ReadUserIngredientType } from "@/types/user-ingredient.type";
import { create } from "zustand";

interface UserIngredientStore {
  userIngredients: ReadUserIngredientType[];
  setUserIngredient: (ingredient: ReadUserIngredientType[]) => void;
  addUserIngre: (newIngredients: ReadUserIngredientType) => void;
  removeUserIngre: (id: number) => void;
}
export const useUserIngreStore = create<UserIngredientStore>((set) => ({
  // Default value
  userIngredients: [],

  // Set user ingredient for fetch api
  setUserIngredient: (ingredient) => set({ userIngredients: ingredient }),

  // Add user ingredient for create
  addUserIngre: (newIngredients) =>
    set((state) => ({
      userIngredients: [...state.userIngredients, newIngredients],
    })),

  removeUserIngre: (id) =>
    set((state) => ({
      userIngredients: state.userIngredients.filter((item) => item.id !== id),
    })),
}));
