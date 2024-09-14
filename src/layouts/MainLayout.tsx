import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <header className="flex max-w-[1450px]  m-auto flex-col items-center justify-between p-2 md:p-24  ">
        <Navbar />
      </header>
      <main className="flex min-h-screen max-w-[1450px]  m-auto flex-col items-center justify-between p-2 md:py-10 md:p-24 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
