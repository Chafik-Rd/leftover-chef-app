import { UserIngredientService } from "@/services/user-ingredient.service";
import { ReadUserIngredientType } from "@/types/user-ingredient.type";
import { create } from "zustand";

interface UserIngredientStore {
  userIngredients: ReadUserIngredientType[];
  isLoading: boolean;
  fetchIngredients: () => Promise<void>;
  addUserIngre: (newIngredients: ReadUserIngredientType) => void;
  removeUserIngre: (id: number) => void;
  clearIngredients: () => void;
}
export const useUserIngreStore = create<UserIngredientStore>((set, get) => ({
  // Default value
  userIngredients: [],
  isLoading: false,

  fetchIngredients: async () => {
    if (get().isLoading) return;

    set({ isLoading: true });
    try {
      const response = await UserIngredientService.getUserIngredient();
      set({ userIngredients: response.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add user ingredient for create
  addUserIngre: (newIngredients) =>
    set((state) => {
      const isExistIndex = state.userIngredients.findIndex((item) => {
        const isSameName = item.name === newIngredients.name;

        const dateA = new Date(item.expiryDate).toDateString();
        const dateB = new Date(newIngredients.expiryDate).toDateString();

        return isSameName && dateA === dateB;
      });

      if (isExistIndex !== -1) {
        const updatedIngredients = [...state.userIngredients];
        updatedIngredients[isExistIndex] = newIngredients;

        return { userIngredients: [...updatedIngredients] };
      }
      return { userIngredients: [...state.userIngredients, newIngredients] };
    }),

  removeUserIngre: (id) =>
    set((state) => ({
      userIngredients: state.userIngredients.filter((item) => item.id !== id),
    })),

  clearIngredients: () => set({ userIngredients: [] }),
}));
