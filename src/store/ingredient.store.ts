import { create } from "zustand";

interface userIngredientType {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientStore {
  selectedIngredients: userIngredientType[];
  addIngredient: (ingredient: userIngredientType) => void;
  removeIngredient: (name: string) => void; // เพิ่มไว้สำหรับลบ
  clearAll: () => void;
}
export const useIngredientStore = create<IngredientStore>((set) => ({
  // Default value
  selectedIngredients: [],

  // Add ingredient
  addIngredient: (newIngredient) =>
    set((state) => {
      const isExist = state.selectedIngredients.some(
        (item) => item.name === newIngredient.name,
      );
      return {
        selectedIngredients: isExist
          ? state.selectedIngredients
          : [...state.selectedIngredients, newIngredient],
      };
    }),

  // Remove ingedient
  removeIngredient: (name) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (i) => i.name !== name,
      ),
    })),

  // Clear all ingedient
  clearAll: () =>
    set(() => ({
      selectedIngredients: [],
    })),
}));
