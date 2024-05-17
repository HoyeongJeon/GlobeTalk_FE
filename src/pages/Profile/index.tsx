import Footer from "@/components/Footer";
import { useProfileStore } from "@/stores/profileStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { languages } from "@/utils/languages";
import Header from "@/components/Header";
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
import { Input } from "@/components/ui/input";

export default function Profile() {
  const navigate = useNavigate();
  const { Profile, setProfile } = useProfileStore((state) => state);
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/users/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response;
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyProfile();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Profile</h1>
          </div>
          <div className="relative">
            <div className="w-80 h-80 flex justify-center">
              <img
                className="object-cover object-center shadow-lg rounded-lg"
                src={`${import.meta.env.VITE_SERVER_HOST}:${
                  import.meta.env.VITE_SERVER_PORT
                }/uploads/${Profile.imageUrl}`}
              />
              <div className="p-4 mx-auto h-80">
                <div className="float-left text-left">
                  <span className="text-xl text-blue-800">Name </span>
                  <span className="text-xl"> | </span>
                  <span>{Profile.nickname}</span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl text-blue-800">State </span>
                  <span className="text-xl"> | </span>
                  <span>{Profile.state}</span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl text-blue-800">Language </span>
                  <span className="text-xl"> | </span>
                  <span>
                    {Profile.language.map((lang) => {
                      const language = languages.find((l) => l.code === lang);
                      return language
                        ? `${language.name} ${language.flag}`
                        : "";
                    })}
                  </span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl text-blue-800">Major </span>
                  <span className="text-xl"> | </span>
                  <span>{Profile.major}</span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl text-blue-800">Introduce </span>
                  <span className="text-xl"> | </span>
                  <span>{Profile.introduce}</span>
                </div>

                <div className="w-full flex flex-nowrap justify-center gap-10">
                  <button
                    className="w-[100px] px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button
                    className=" w-[100px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => navigate("/me/edit")}
                  >
                    Edit
                  </button>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className=" w-[240px] px-4 py-2 mt-5 font-bold text-gray-700 bg-gray-300 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline">
                    Delete Account
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Report User</AlertDialogTitle>
                      <AlertDialogDescription>
                        {/* <label className="block mb-2 text-sm font-bold text-gray-700">
                          Content
                        </label>
                        <Input placeholder="Write down the reason why you report" />
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Date(eg. 211231 23 59)
                        </label>
                        <Input placeholder="YYMMDD Hour Minute" /> */}
                        <div className="w-full px-3 mt-5">
                          <label className="block mb-2 text-sm font-bold text-gray-700">
                            If you want to delete your account, please enter
                            your password below.
                          </label>
                          <input
                            name="password"
                            type="password"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            placeholder="Enter your password"
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          console.log("hello");
                        }}
                      >
                        Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
