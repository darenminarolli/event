import EventCard from "./EventCard";
import { useAuth } from "../hooks/useAuth";
import { useEventContext } from "../contexts/EventContext";

const CreatedEvents = () => {
  const { user } = useAuth();
  const { isLoading, createdEvents } = useEventContext();

  console.log("user: ", user);
  console.log("createdEvents: ", createdEvents);

  if (isLoading) {
    return <p className="text-center">Loading events...</p>;
  }

  if (!createdEvents || createdEvents.length === 0) {
    return <p className="text-center">No events found.</p>;
  }

  return (
    <div className="flex flex-col ">
      <h2 className="self-center secondary-text">
        {user?.role === "admin" ? "" : "Events you have created"}
      </h2>
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
    </div>
  );
};

export default CreatedEvents;
