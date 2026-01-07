import { CreateUserIngredientType } from "@/types/user-ingredient.type";
import api from "./api";

export class UserIngredientService {
  // Get user ingredient
  static async getUserIngredient() {
    const response = await api.get("/api/user-ingredient");
    return response.data;
  }

  // Create user ingredient
  static async createUserIngredient(data: CreateUserIngredientType) {
    const response = await api.post("/api/user-ingredient", data);
    return response.data;
  }

  // Delete user ingredient
  static async deleteUserIngredient(id: number) {
    const response = await api.delete(`/api/user-ingredient/${id}`);
    return response.data;
  }
}
