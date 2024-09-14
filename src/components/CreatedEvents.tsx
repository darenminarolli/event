import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useAuth } from "../hooks/useAuth";
import { EventService } from "../services/EventService";
import { Event } from "../types/event";

const CreatedEvents = () => {
  const { user } = useAuth();

  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        if (!user) return;
        if (user.role === "admin") {
          const allEvents = await EventService.getAllEvents();
          setCreatedEvents(allEvents);
          return;
        }
        const res = await EventService.getEvents(user?._id);
        setCreatedEvents(res);
      } catch (error) {
        console.error("Failed to fetch created events:", error);
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatedEvents();
  }, []);

  return (
    <div className="flex flex-col ">
      <h2 className="self-center secondary-text">
        {user?.role === "admin" ? "" : "Events you have created"}
      </h2>
      {isLoading ? (
        <p className="text-center">Loading events...</p>
      ) : createdEvents.length > 0 ? (
        <div className="w-full flex flex-col gap-y-10">
          {createdEvents.map((event) => (
            <EventCard
              className="!bg-slate-300"
              key={event._id}
              event={event}
              status="owner"
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </div>
  );
};

export default CreatedEvents;
