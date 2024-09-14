import api from "./api";
import { AxiosResponse } from "axios";
import { Event } from "../types/event";
import { Attendee, EventRegistrationParams } from "../types/attendee";

export const AttendeeService = {
  getReservedEvents: async (userId?: string): Promise<Event[]> => {
    try {
      const response: AxiosResponse<Event[]> = await api.get(
        `/attendees/reserved/${userId}`
      );
      return response.data ?? [];
    } catch (error: any) {
      console.error(error);
      throw error.response?.data || error;
    }
  },
  getAttendees: async (eventId?: string) => {
    try {
      const response = await api.get(`/attendees/${eventId}`);
      return response.data ?? [];
    } catch (error: any) {
      console.error(error);
      throw error.response?.data || error;
    }
  },
  eventRegistration: async ({
    eventId,
    userId,
  }: EventRegistrationParams): Promise<Attendee> => {
    try {
      const data = { eventId, userId };
      const response: AxiosResponse<Attendee> = await api.post(
        "/attendees",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error.response?.data || error;
    }
  },
};
