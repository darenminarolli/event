import { ReactNode, useEffect, useState } from "react";
import CreatedEvents from "../components/CreatedEvents";
import LogOut from "../components/icons/LogOut";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { UserService } from "../services/UserService";
import { User } from "../types/user";
import UserCard from "../components/UserCard";
import Modal from "../components/ui/Modal";
import EventForm from "../components/EventForm";
import UserForm from "../components/UserForm";

const AdminPage = ({children}:{children:ReactNode}) => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = await UserService.getAllUsers();
        console.log("All users:", users);
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch all users:", error);
      }
    };
    getAllUsers();
  }, []);

  const handleDelete = async (id?: string) => {
    try {
      await UserService.deleteUser(id);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = async (updatedUser: User, id?: string) => {
    try {
      const result = await UserService.updateUser(updatedUser, id);
      if (result) {
        const updatedUsers = users.map((user) =>
          user._id === id ? result : user
        );
        setUsers(updatedUsers);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col text-center gap-y-6 mb-20">
        <h1 className="header-text">#Admin Page</h1>
        <p>
          Hi Admin. Here you can see all users, events, and any other
          information you'd like to share.
        </p>
        <div className="w-full flex justify-between md:justify-end items-center gap-4 ">
          <Button
            className="md:w-fit"
            onClick={() => setIsEventModalOpen(true)}
          >
            + Create User
          </Button>
          <Button className="md:w-fit" onClick={logout}>
            <LogOut /> Log Out
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-10 md:gap-y-40">
        <div>
          <h2 className="secondary-text">All Users</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {users && users.length > 0 ? (
              users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  handleDelete={() => handleDelete(user?._id)}
                  openEditModal={openEditModal} 
                />
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="secondary-text">All Events</h2>
          {/* <CreatedEvents /> */}
          {children}
        </div>
      </div>
      <Modal
        onClose={() => setIsEventModalOpen(false)}
        isOpen={isEventModalOpen}
      >
        <h1 className="header-text">#Event Creation</h1>
        <EventForm />
      </Modal>

      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h1 className="header-text">#Update User</h1>
        {selectedUser && (
          <UserForm handleEdit={handleEdit} user={selectedUser} /> 
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;
