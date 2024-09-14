import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex  gap-2 sm:flex-row my-14 py-14 w-full shrink-0 justify-center items-center px-2 md:px-10 border-t border-gray-400">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024{" "}
        <a href="https://daren.vercel.app/" className="underline">
          Daren
        </a>
        . All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" to="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" to="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
