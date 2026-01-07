import { AuthService } from "@/services/auth.service";
import { create } from "zustand";
interface User {
  firstName: string;
  email: string;
  role: string;
}
interface AuthStrore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStrore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () =>
    set(() => {
      AuthService.logout();
      return { user: null };
    }),
}));
