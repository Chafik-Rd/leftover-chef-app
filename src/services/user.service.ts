import api from "./api";

export class UserService {
  // Get user profile
  static async getUserProfile() {
    const response = await api.get("/api/user/profile");
    return response.data;
  }
}
