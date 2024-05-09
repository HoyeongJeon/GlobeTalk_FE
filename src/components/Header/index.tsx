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
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  useEffect(() => {
    const getChatRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/chats/toMe`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // data들 저장하기
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getChatRequests();
  }, []);

  return (
    <header className="w-screen">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <AlertDialog>
          <AlertDialogTrigger className="rounded-full bg-sky-400 p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-black dark:hover:bg-secondary-900">
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Notice</span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Chat Requests to you</AlertDialogTitle>
              <AlertDialogDescription>
                요청 목록 보여주기
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* <AlertDialogCancel className="bg-sky-300 hover:bg-sky-700">
                Cancel
              </AlertDialogCancel> */}
              <AlertDialogAction className="bg-sky-300 hover:bg-sky-700">
                Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>
    </header>
  );
}
