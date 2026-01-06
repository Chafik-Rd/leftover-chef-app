import api from "./api";

export class IngredientService {
  // Read all ingredient
  static async getAllIngredient() {
    const response = await api.get("/api/ingredient");
    return response.data;
  }
}
