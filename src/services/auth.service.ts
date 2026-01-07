import { RegisterType } from "@/types/auth.type";
import api from "./api";

export class AuthService {
  // Register
  static async register(data: RegisterType) {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  }

  // Login
  static async login(email: string, password: string) {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  }

  // Logout
  static async logout() {
    const response = await api.post("api/auth/logout");
    return response.data;
  }
}
