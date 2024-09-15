import { createContext, useContext, useState, useEffect } from "react";
import { Event } from "../types/event";
import { EventService } from "../services/EventService";
import { useAuth } from "../hooks/useAuth";

interface EventContextType {
  events: Event[];
  createdEvents: Event[];
  setCreatedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
   isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  fetchEvents: () => Promise<void>;
  handleCreateEvent: (eventData: Event) => Promise<void>;
  fetchCreatedEvents: () => Promise<void>;
  handleUpdateEvent: (eventData: Event, eventId: string) => Promise<void>;
  handleDeleteEvent: (eventId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const fetchCreatedEvents = async () => {
    if (!user) return; // Ensure user is available
    setIsLoading(true); // Set loading state specific to created events

    try {
      if (user.role === "admin") {
        const allEvents = await EventService.getAllEvents();
        setCreatedEvents(allEvents);
      } else {
        const res = await EventService.getEvents(user._id);
        setCreatedEvents(res);
      }
    } catch (error) {
      console.error("Failed to fetch created events:", error);
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
    } finally {
      setIsModalOpen(false);
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
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId);
      await fetchCreatedEvents();
    } catch (error) {
      alert("Could not delete event");
      console.error("Error during delete:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreatedEvents(); 
    }
    fetchEvents();
  }, [user]); 

  return (
    <EventContext.Provider
      value={{
        events,
        createdEvents,
        setCreatedEvents,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        fetchEvents,
        fetchCreatedEvents,
        handleCreateEvent,
        handleUpdateEvent,
        handleDeleteEvent,
      }}
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
