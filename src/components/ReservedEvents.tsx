import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "../types/event";
import { useAuth } from "../hooks/useAuth";
import { AttendeeService } from "../services/AttendeService";
const ReservedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservedEvents = async () => {
      try {
        if (!user) return;
        const res = await AttendeeService.getReservedEvents(user._id);
        setEvents(res);
      } catch (error) {
        console.error("Failed to fetch created events:", error);
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservedEvents();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="self-center secondary-text">Events you have reserved</h2>
      {isLoading ? (
        <p className="text-center">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="w-full flex flex-col gap-y-10">
          {events.map((event) => (
            <EventCard
              className="!bg-indigo-300"
              key={event._id}
              event={event}
              status="reserved"
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </div>
  );
};

export default ReservedEvents;
