import Input from "./ui/Input";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { EventService } from "../services/EventService";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/event";

const schema = z.object({
  name: z.string().trim().min(3).max(100),
  desc: z.string().trim().min(3).max(500),
  date: z.string().date(),
  location: z.string().trim().min(1, "Location is required"),
});
type FormFields = z.infer<typeof schema>;

const EventForm = ({ event }: { event?: Event }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: event?.name || "",
      desc: event?.desc || "",
      date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "",
      location: event?.location || "",
    },
    resolver: zodResolver(schema),
  });
  console.log(event);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const dataTosend = { ...data, organizer: user?._id };
      console.log("send", dataTosend);
      let res;
      if (event) {
        res = await EventService.updateEvent(dataTosend, event._id);
      } else {
        res = await EventService.createEvent(dataTosend);
      }
      if (res) {
        console.log("Event created successfully:", res);
        navigate('/profile');
      }
    } catch (error) {
      setError("root", {
        message: `${(error as Error)?.message}`,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-[600px] m-auto flex flex-col gap-y-4 my-4 "
    >
      <label htmlFor="name">Event Title:</label>
      <Input
        {...register("name")}
        required
        type="text"
        placeholder="Enter your event's title"
      />
      <h2 className="text-textDanger">{errors.name?.message}</h2>

      <label htmlFor="desc">Description:</label>
      <TextArea
        {...register("desc")}
        placeholder="Enter the description of the event..."
      />
      <h2 className="text-textDanger">{errors.desc?.message}</h2>

      <label htmlFor="date">Date:</label>
      <Input
        {...register("date")}
        type="date"
        placeholder="Enter the date pf the event..."
      />
      <h2 className="text-textDanger">{errors.date?.message}</h2>
      <label htmlFor="location">Location:</label>
      <Input
        {...register("location")}
        type="text"
        placeholder="Enter the location of the event..."
      />
      <h2 className="text-textDanger">{errors.location?.message}</h2>
      <h2 className="text-textDanger">{errors.root?.message} </h2>
      <Button
        className="justify-center"
        disabled={isSubmitting}
        onClick={() => {}}
        type="submit"
      >
       {event? 'Update': 'Create' } Event
      </Button>
    </form>
  );
};

export default EventForm;
