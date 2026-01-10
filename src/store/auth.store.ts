import { AuthService } from "@/services/auth.service";
import { create } from "zustand";
import { useUserIngreStore } from "./user-ingredient.store";

interface User {
  firstName: string;
  email: string;
  role: string;
}
interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () =>
    set(() => {
      AuthService.logout();
      const { clearIngredients } = useUserIngreStore.getState();
      clearIngredients();
      localStorage.removeItem('is_logged_in');
      return { user: null };
    }),
}));
