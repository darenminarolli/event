import EventCard from "../components/EventCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EventForm from "../components/EventForm";
import { useAuth } from "../hooks/useAuth";
import { useEventContext } from "../contexts/EventContext";

const EventsPage = () => {
  const { isAuthenticated } = useAuth();
  const { events, isLoading, isModalOpen, setIsModalOpen } = useEventContext();




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
                status={"reserve"}
                event={event}
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
