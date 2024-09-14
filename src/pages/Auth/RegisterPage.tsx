import { Link } from "react-router-dom";
import UserForm from "../../components/UserForm";

const RegisterPage = () => {
  return (
    <>
      <section className="w-full flex flex-col">
        <h1 className="header-text">#Register Page</h1>
        <UserForm />
        <p className="self-center mt-10">
          Already have an account?{" "}
          <Link className="underline text-main" to="/login">
            Log In
          </Link>
        </p>
      </section>
    </>
  );
};

export default RegisterPage;
