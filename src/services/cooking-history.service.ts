import api from "./api";

export class CookingHistoryService {
  static async createCookingHid(recipeId: number, customServings?: number) {
    const response = await api.post("/api/cooking-history", {
      recipeId,
      customServings,
    });
    return response.data;
  }
}
