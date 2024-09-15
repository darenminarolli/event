import LogOut from "../components/icons/LogOut";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import CreatedEvents from "../components/CreatedEvents";
import ReservedEvents from "../components/ReservedEvents";

const ProfilePage = () => {

  const { logout } = useAuth();

  return (
    <div>
      <div className="w-full  flex flex-col text-center gap-y-6 mb-20">
        <h1 className="header-text">#Profile Page</h1>
        <p>
          Hi Daren. Here you can see your details, events you've created or
          reserved, and any other information you'd like to share.
        </p>
        <Button className="md:w-fit md:self-end" onClick={logout}>
          <LogOut /> Log Out
        </Button>
      </div>
      <div className="w-full  flex flex-col  gap-10">
        <CreatedEvents />
        <hr />
        <ReservedEvents />
      </div>
    </div>
  );
};

export default ProfilePage;
