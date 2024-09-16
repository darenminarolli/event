import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { Event } from "../types/event";
import { useAuth } from "../hooks/useAuth";
import { useEventContext } from "../contexts/EventContext";
import { AttendeeService } from "../services/AttendeService";

interface Props {
  status?: "reserve" | "reserved" | "owner";
  event: Event;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onStatusChange?: (
    eventId: string,
    newStatus: "reserve" | "reserved" | "owner"
  ) => void;
}

const EventActions: React.FC<Props> = ({
  status,
  event,
  setIsModalOpen,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { handleDeleteEvent } = useEventContext();
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await AttendeeService.getAttendees(event._id);
        setAttendees(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttendees();
  }, []);
console.log(`Attendees ${attendees}`)
  const handleReservation = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to reserve an event");
      return;
    }
    try {
      const res = await AttendeeService.eventRegistration({
        eventId: event._id,
        userId: user?._id,
      });
      console.log("Reservation successful:", res);
    } catch (error) {
      alert("Could not make a reservation");
      console.error("Error during reservation:", error);
    }
  };

  if (status === "reserve") {
    return (
      <Button className="md:w-1/4" onClick={handleReservation}>
        Reserve
      </Button>
    );
  }

  if (status === "owner") {
    return (
      <div className="flex justify-between items-center gap-10">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <Button className="bg-blue-600" onClick={() => setIsModalOpen(true)}>
            Edit
          </Button>
          <Button
            className="bg-red-600"
            onClick={() => {
              if (event._id) handleDeleteEvent(event._id);
            }}
          >
            Delete
          </Button>
        </div>
        <div className="w-full bg-slate-900 text-slate-100 rounded-r-lg p-4">
          <h3 className="text-lg font-bold">Attendee list:</h3>
          <ul className="min-h-10 max-h-14 overflow-y-auto">
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <li key={attendee._id} className="py-2">
                  {attendee.user.firstName} {attendee.user.lastName} -{" "}
                  <span className="text-sm text-slate-400">
                    {attendee.user.email}
                  </span>
                </li>
              ))
            ) : (
              <p>No attendees yet.</p>
            )}
          </ul>
        </div>
      </div>
    );
  }

  if (status === "reserved") {
    return <h2 className="text-textDanger">Reserved</h2>;
  }

  return null;
};

export default EventActions;
