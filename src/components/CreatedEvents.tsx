import { useEffect } from "react";
import EventCard from "./EventCard";
import { useAuth } from "../hooks/useAuth";
import { useEventContext } from "../contexts/EventContext";

const CreatedEvents = () => {
  const { user } = useAuth();
  const { fetchCreatedEvents, isLoading, createdEvents } = useEventContext();

  useEffect(() => {
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
