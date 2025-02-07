import React, { useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import { Event } from "../types/event";
import EventActions from "./EventActions";
import Modal from "./ui/Modal";
import EventForm from "./EventForm";
interface PropsType {
  className?: string;
  status?: "reserve" | "reserved" | "owner";
  event?: Event;
}
const EventCard: React.FC<PropsType> = ({ className, status, event }) => {
  const { isModalOpen, setIsModalOpen} = useEventContext()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
  if (!event) {
    return null;
  }
  const handleEditClick = () => {
    setSelectedEvent(event);  
    setIsModalOpen(true);     
  };
  return (
    <>
      <div
        className={
          className +
          " w-full flex flex-col p-6 gap-y-4 border-effect bg-lightBg text-secondaryBlack"
        }
      >
        <div className="w-full flex justify-between flex-wrap">
          <h2 className="text-2xl md:text-4xl font-bold">{event.name}</h2>
          <div className="flex items-center gap-x-4">
            <span className="">
              Date: {new Date(event.date).toISOString().split("T")[0]}
            </span>
          </div>
        </div>
        <div className=" flex flex-col gap-4">
          <p className="text-xl leading-2 tracking-wider">{event.desc}</p>
          <EventActions
            status={status}
            onEdit={handleEditClick}
            event={event}
            />
          <p className="self-end">Location: {event?.location}</p>
        </div>
      </div>
      {
        selectedEvent && 
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h1 className="header-text">#Update Event</h1>
        <EventForm event={selectedEvent} />
      </Modal>
      }
    </>
  );
};

export default EventCard;
