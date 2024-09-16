import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { User } from "../types/user";
import { AuthService } from "../services/AuthService";

const schema = z
  .object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email().max(50),
    password: z
      .string()
      .optional()
      .refine(
        (value) => !value || value.length >= 8,
        { message: "Password must be at least 8 characters long." }
      ),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (values) => {
      if (values.password || values.confirmPassword) {
        return values.password === values.confirmPassword;
      }
      return true; 
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type FormFields = z.infer<typeof schema>;

interface PropsType {
  user?: User;
  handleEdit?: (updatedUser: User, id?: string) => Promise<void>;
}
const UserForm = ({ user, handleEdit }: PropsType) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { confirmPassword, ...userData } = data;

    const updatedUserData = {
      ...userData,
      password: data.password || undefined,
    };

    try {
      let res;
      if (user && handleEdit) {
        res = await handleEdit(updatedUserData, user._id);
      } else {
        res = await AuthService.registerUser(data);  
          if (res) {
            console.log("User action successful:", res);
            navigate('/login')
          }
         }
    } catch (error) {
      setError("root", {
        message: `${(error as Error)?.message}`,
      });
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-[600px] w-full m-auto flex flex-col gap-y-4 my-4"
    >
      <label htmlFor="firstName">First Name:</label>
      <Input
        {...register("firstName")}
        type="text"
        required
        placeholder="Enter your first name..."
      />
      <label htmlFor="lastName">Last Name:</label>
      <Input
        {...register("lastName")}
        type="text"
        required
        placeholder="Enter your last name..."
      />
      <label htmlFor="email">Email:</label>
      <Input
        {...register("email")}
        type="email"
        required
        placeholder="Enter your email"
      />
      <h2 className="text-textDanger">{errors.email?.message}</h2>
      <label htmlFor="password">Password:</label>
      <Input
        {...register("password")}
        type="password"
        placeholder={
          user ? "Enter new password (or leave blank)" : "Enter your password"
        }
      />
      <h2 className="text-textDanger">{errors.password?.message}</h2>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <Input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm new password"
      />
      <h2 className="text-textDanger">{errors.confirmPassword?.message}</h2>

      <Button className="justify-center" disabled={isSubmitting} type="submit">
        {user ? "Update" : "Register"} User
      </Button>
    </form>
  );
};

export default UserForm;
