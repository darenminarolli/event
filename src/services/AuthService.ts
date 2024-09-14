import { AxiosResponse } from "axios";
import api from "./api";
import { User } from "../types/user";

export const AuthService = {
  registerUser: async (data: User): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await api.post(
        "/auth/register",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error.response?.data || error;
    }
  },
  loginUser: async (data: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const response: AxiosResponse<{ token: string }> = await api.post(
        "/auth/login",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error.response?.data || error;
    }
  },
  logoutUser: async () => {
    await api.post("/auth/logout");
  },
};
