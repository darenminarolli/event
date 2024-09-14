import api from "./api";
import { Event } from "../types/event";
import { AxiosResponse } from "axios";

export const EventService = {
  getAllEvents: async (): Promise<Event[]> => {
    try {
      const response: AxiosResponse<Event[]> = await api.get("/events");
      return response.data ?? [];
    } catch (error: any) {
      console.error("Error fetching events:", error);
      return [];
    }
  },
  getEvents: async (userId?: string): Promise<Event[]> => {
    try {
      const response: AxiosResponse<Event[]> = await api.get(
        `/events/${userId}`
      );
      return response.data ?? [];
    } catch (error) {
      console.error("Error fetching events for user:", error);
      return [];
    }
  },
  createEvent: async (eventData: Event): Promise<Event> => {
    try {
      const response: AxiosResponse<Event> = await api.post(
        "/events",
        eventData
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating event:", error);
      throw error.response?.data || error;
    }
  },

  updateEvent: async (eventData: Event, eventId?: string): Promise<Event> => {
    try {
      const response: AxiosResponse<Event> = await api.put(
        `/events/${eventId}`,
        eventData
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating event:", error);
      throw error.response?.data || error;
    }
  },

  deleteEvent: async (eventId?: string): Promise<void> => {
    try {
      await api.delete(`/events/${eventId}`);
    } catch (error: any) {
      console.error("Error deleting event:", error);
      throw error.response?.data || error;
    }
  },
};
