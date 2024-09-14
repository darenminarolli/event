import { AxiosResponse } from "axios";
import api from "./api";
import { User } from "../types/user";

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response: AxiosResponse<User[]> = await api.get("/users");
      return response.data ?? [];
    } catch (error: any) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  updateUser: async (userData: User, userId?: string): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await api.put(
        `/users/${userId}`,
        userData
      );
      return response?.data;
    } catch (error: any) {
      console.error("Error updating event:", error);
      throw error.response?.data || error;
    }
  },
  deleteUser: async (id?: string): Promise<void> => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw error.response?.data || error;
    }
  },
};
