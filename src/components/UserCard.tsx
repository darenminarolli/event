import { User } from "../types/user";
import Button from "./ui/Button";

interface PropsType {
  user: User | null;
  handleDelete: () => void;
  openEditModal: (user: User) => void;
}

const UserCard: React.FC<PropsType> = ({ user, handleDelete, openEditModal }) => {
  if (!user) {
    return <p>Loading user details...</p>; 
  }

  return (
    <div className="w-full flex justify-between items-center p-6 gap-y-4 border-effect bg-slate-200 text-darkText">
      <div className="w-full">
        <h2 className="text-2xl font-bold secondary-text">
          {user.role === 'admin' ? 'Admin' : 'User'} Card
        </h2>
        <p className="text-lg font-bold">
          Name: {user.firstName || "No First Name"} {user.lastName || "No Last Name"}
        </p>
        <p className="text-lg font-bold">Email: {user.email || "No Email"}</p>
      </div>
      <div className="w-full space-y-4">
        <Button className="bg-red-600" onClick={handleDelete}>
          Delete
        </Button>
        <Button className="bg-blue-600" onClick={() => openEditModal(user)}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
