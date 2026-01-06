import { CreateRecipeType, UpdateRecipeType } from "@/types/recipe.type";
import api from "./api";

export class RecipeService {
  // Function to create a new recipe
  static async createRecipe(data: CreateRecipeType) {
    const formData = new FormData();

    // Append data to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (key === "ingredients" || key === "instructions") {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await api.post("/api/recipe", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type multipart/form-data
      },
    });
    return response.data;
  }

  // Function to update an existing recipe
  static async updateRecipe(id: number, data: UpdateRecipeType) {
    const response = await api.patch(`/api/recipe/${id}`, data);
    return response.data;
  }

  // Function to fetch all recipes
  static async fetchAllRecipes() {
    const response = await api.get("api/recipe");
    return response.data;
  }

  // Function to fetch a recipe by ID
  static async fetchRecipeById(id: number) {
    const response = await api.get(`/api/recipe/${id}`);
    return response.data;
  }

  // Function to delete a recipe by ID
  static async deleteRecipe(id: number) {
    const response = await api.delete(`/api/recipe/${id}`);
    return response.data;
  }
}
