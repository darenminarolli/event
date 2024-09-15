import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EventForm from "../components/EventForm";
import { Event } from "../types/event";
import { EventService } from "../services/EventService";
import { useAuth } from "../hooks/useAuth";

const EventsPage = () => {
  const { isAuthenticated } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [eventStatuses, setEventStatuses] = useState<{
    [key: string]: "reserve" | "reserved" | "owner";
  }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await EventService.getAllEvents();
        setEvents(response);

        const statuses = response.reduce(
          (
            acc: { [key: string]: "reserve" | "reserved" | "owner" },
            event: Event
          ) => {
            if (event._id) {
              acc[event._id] = "reserve";
            }
            return acc;
          },
          {}
        );
        setEventStatuses(statuses);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleStatusChange = (
    eventId: string,
    newStatus: "reserve" | "reserved" | "owner"
  ) => {
    setEventStatuses((prevStatuses) => ({
      ...prevStatuses,
      [eventId]: newStatus,
    }));
  };

  const handleEventCreation = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to reserve an event");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <hgroup className="w-full flex flex-col mb-10">
        <h1 className="self-center header-text pb-4">#Events</h1>
        <p className="text-2xl self-center">This is the Events page.</p>
        <Button
          className="!w-fit self-end items-start mt-10"
          onClick={handleEventCreation}
        >
          + Create Event
        </Button>
      </hgroup>

      {isLoading ? (
        <p className="text-center">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="w-full flex flex-col gap-y-10">
          {events.map((event) => {
            if (!event._id) return null;

            return (
              <EventCard
                key={event._id}
                status={eventStatuses[event._id] || "reserve"}
                event={event}
                onStatusChange={handleStatusChange}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}

      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h1 className="header-text">#Event Creation</h1>
        <EventForm />
      </Modal>
    </>
  );
};

export default EventsPage;
