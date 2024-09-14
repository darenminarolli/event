import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="w-full flex flex-col">
        <h1 className="header-text">#EventPal</h1>
        <p className="text-center text-2xl mb-4">
          Welcome to EventPal, your one-stop event planning solution.
        </p>
        <div className="self-center">
          <img
            className="rounded-lg  shadow-lg w-full lg:max-w-[1050px]"
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="party image"
          />
        </div>
      </section>
      <section
        id="about"
        className="w-full flex flex-wrap justify-between my-14 md:my-24 md:py-24"
      >
        <h1 className="header-text">#About Us</h1>
        <div className="flex flex-wrap md:flex-nowrap gap-4  ">
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl pb-2">Who are we??</h2>
            <p className="text-xl leading-2 tracking-wider ">
              EventPal is a cutting-edge event planning app that helps users
              find, plan, and book events at their fingertips. With our
              extensive database of events, we offer a wide range of options for
              hosting, hosting parties, and hosting events for others. We're
              here to help you plan your next big event, whether it's a birthday
              party, a corporate event, or a family gathering. To get started,
              simply sign up and let us help you find the perfect event for your
              needs.
            </p>
            <Button
              className="!w-fit"
              onClick={() => {
                navigate("/events");
              }}
            >
              Discover Events
            </Button>
            <img
              className="  w-full rounded-lg shadow-lg "
              src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="audience img"
            />
          </div>
          <img
            className=" rounded-lg shadow-lg"
            src="https://images.pexels.com/photos/3171830/pexels-photo-3171830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="people partying"
          />
        </div>
      </section>
      <Contact />
    </>
  );
};

export default HomePage;
