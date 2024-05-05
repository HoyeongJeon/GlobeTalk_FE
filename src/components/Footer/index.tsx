import { useStore } from "@/stores/store";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Footer() {
  const { setIsLoggedIn } = useStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };
  return (
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
      <div className="container pt-9">
        <div className="mb-6 flex justify-center space-x-2">
          <Link
            to="/"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            data-twe-ripple-init
          >
            <span className="[&>svg]:h-5 [&>svg]:w-5">Home</span>
          </Link>

          <Link
            to="/chat"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            data-twe-ripple-init
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Chat</span>
          </Link>

          <Link
            to="/me"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            data-twe-ripple-init
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">MyProfile</span>
          </Link>

          <Link
            to="/login"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            data-twe-ripple-init
            onClick={handleLogout}
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Logout</span>
          </Link>
        </div>
      </div>

      <div className="w-full bg-black/5 p-4 text-center">
        © 2024 Copyright:
        <a href="https://github.com/HoyeongJeon/GolobeTalk_FE">Hoyeong Jun</a>
      </div>
    </footer>
  );
}
