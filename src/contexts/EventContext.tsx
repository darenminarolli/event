import { createContext, useContext, useState, useEffect } from "react";
import { Event } from "../types/event";
import { EventService } from "../services/EventService";

interface EventContextType {
  events: Event[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  handleCreateEvent: (eventData: Event) => Promise<void>;
  handleUpdateEvent: (eventData: Event, eventId: string) => Promise<void>;
  handleDeleteEvent: (eventId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await EventService.getAllEvents();
      setEvents(response);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (eventData: Event) => {
    try {
      await EventService.createEvent(eventData);
      await fetchEvents();
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };
  const handleUpdateEvent = async (eventData: Event, eventId: string) => {
    try {
      if (eventId) {
        await EventService.updateEvent(eventData, eventId);
      }
      await fetchEvents();
    } catch (error) {
      console.error("Failed to create/update event:", error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const event = await EventService.deleteEvent(eventId);
      console.log("Event deleted successfully:", event);
      await fetchEvents();
    } catch (error) {
      alert("Could not delete event");
      console.error("Error during delete:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, isLoading, fetchEvents, handleCreateEvent, handleUpdateEvent, handleDeleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("error with useEventContext");
  }
  return context;
};
