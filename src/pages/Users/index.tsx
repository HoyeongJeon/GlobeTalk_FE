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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // setIsLoggedIn(false);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response;
      } catch (error) {}
    };
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="pb-3.5">
          {/* <h1 className="text-6xl font-bold pb-3.5">Admin</h1> */}
        </div>
      </main>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
        <div className="container pt-9">
          <div className="mb-6 flex justify-center space-x-2">
            <Link
              to="/admin"
              type="button"
              className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
              data-twe-ripple-init
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">Reported</span>
            </Link>

            <Link
              to="/admin/users"
              type="button"
              className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
              data-twe-ripple-init
            >
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Users</span>
            </Link>

            {/* <Link
              to="/me"
              type="button"
              className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
              data-twe-ripple-init
            >
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">MyProfile</span>
            </Link> */}

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
    </div>
  );
}
