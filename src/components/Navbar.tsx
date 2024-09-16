import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Profile from "./icons/Profile";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    switch (location.hash) {
      case "#about":
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
      case "#contact":
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full  fixed  z-50 max-w-[1250px] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }  border-effect z-50`}
    >
      <div className="flex lg:hidden justify-between items-center p-4">
        <Link className="text-xl  font-bold" to="/">
          EventPal
        </Link>
        <button className="block  px-2 py-1 text-gray-600" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <ul
        className={`lg:flex lg:justify-evenly lg:items-center lg:space-x-4 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <li>
          <Link className="block p-2" to="/">
            Home
          </Link>
        </li>
        <li>
          <a className="block p-2" href="/#about">
            About
          </a>
        </li>
        <li>
          <Link className="block p-2" to="/events">
            Events
          </Link>
        </li>
        <li>
          <a className="block p-2" href="/#contact">
            Contact
          </a>
        </li>
        {isAuthenticated ? (
          <li>
            <Link
              to={user?.role === "user" ? "/profile" : "/admin"}
              className="flex gap-2 items-center block p-2"
            >
              <Profile /> Profile
            </Link>
          </li>
        ) : (
          <li>
            <Link className="block p-2" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
