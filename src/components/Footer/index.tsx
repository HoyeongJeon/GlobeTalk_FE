import { useStore } from "@/stores/store";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Footer() {
  const { setIsLoggedIn } = useStore((state) => state);
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
            to="/chats"
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

          <AlertDialog>
            <AlertDialogTrigger className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Logout</span>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to logout?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-sky-300 hover:bg-sky-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-sky-300 hover:bg-sky-700">
                  <Link
                    to="/login"
                    type="button"
                    data-twe-ripple-init
                    onClick={handleLogout}
                  >
                    <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                      Logout
                    </span>
                  </Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="w-full bg-black/5 p-4 text-center">
        © 2024 Copyright:
        <a href="https://github.com/HoyeongJeon/GolobeTalk_FE">Hoyeong Jun</a>
      </div>
    </footer>
  );
}
