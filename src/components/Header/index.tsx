import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useState } from "react";
import Modal from "@/components/Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: number;
  country: string;
  nickname: string;
  introduce: string;
  imageUrl: string;
  language: string[];
  major: string;
  state: string;
}

export default function Header() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();
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
      const { data } = response;
      if (data.length !== 0) {
        data.forEach((profile: Profile) => {
          if (
            !profiles.some(
              (existingProfile) => existingProfile.id === profile.id
            )
          ) {
            setProfiles((prev): Profile[] => [...prev, profile]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postAcceptRequest = async (targetId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/chats/toMe`,
        {
          targetId,
          isAccept: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      // if (response.status === 201) {
      //   Swal.fire({
      //     title: `요청을 수락했습니다.`,
      //     icon: "success",
      //     confirmButtonText: "OK",
      //   });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const postRejectRequest = async (targetId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/chats/toMe`,
        {
          targetId,
          isAccept: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-screen">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <AlertDialog>
          <AlertDialogTrigger className="rounded-full p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-black dark:hover:bg-secondary-900">
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={getChatRequests}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Chat Requests to you</AlertDialogTitle>
              <AlertDialogDescription>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Nickname</TableHead>
                      <TableHead>Introduce</TableHead>
                      <TableHead></TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.length === 0 ? (
                      <span className="font-serif">요청 ❌</span>
                    ) : (
                      profiles.map((profile) => {
                        return (
                          <>
                            <TableRow key={profile.id}>
                              <TableCell className="font-medium">
                                {/* <Modal
                                key={profile.id}
                                imageUrl={profile.imageUrl}
                                nickname={profile.nickname}
                                introduce={profile.introduce}
                                language={profile.language}
                                major={profile.major}
                                country={profile.country}
                                imageTrue={false}
                              /> */}
                                {profile.nickname}
                              </TableCell>
                              <TableCell>
                                {profile.introduce.length > 20
                                  ? profile.introduce.substring(0, 20) + "..."
                                  : profile.introduce}
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell className="text-right">
                                <button
                                  type="button"
                                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                  onClick={() => postAcceptRequest(profile.id)}
                                >
                                  ✅
                                </button>
                              </TableCell>
                              <TableCell className="text-right">
                                <button
                                  type="button"
                                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                  onClick={() => postRejectRequest(profile.id)}
                                >
                                  ❌
                                </button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
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
