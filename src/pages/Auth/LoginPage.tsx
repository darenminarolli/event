import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(20),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await login(data);
      console.log(res);
    } catch (error) {
      setError("root", {
        message: `${(error as Error)?.message}`,
      });
    }
  };
  if (isAuthenticated) {
    navigate("/");
    return;
  }
  return (
    <section className="w-full flex flex-col">
      <h1 className="header-text">#Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[600px] m-auto flex flex-col  gap-y-4 my-4 "
      >
        <label htmlFor="email">Email:</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
        />
        <h2 className="text-textDanger">{errors.email?.message}</h2>

        <label htmlFor="password">Password:</label>
        <Input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        <h2 className="text-textDanger">{errors.password?.message}</h2>

        <h2 className="text-textDanger">{errors.root?.message} </h2>
        <Button
          className="justify-center"
          disabled={isSubmitting}
          onClick={() => {}}
          type="submit"
        >
          Login
        </Button>
      </form>
      <p className="self-center mt-6">
        Don't have an account?{" "}
        <Link className="underline text-main" to="/register">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
