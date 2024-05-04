import Footer from "@/components/Footer";
import { useProfileStore } from "@/stores/profileStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Profile</h1>
          </div>
          <div className="relative">
            <div className="w-80 h-80 flex justify-center">
              <img
                className="object-cover object-center shadow-lg rounded-lg"
                src="https://unsplash.it/400/400"
              />
              <div className="p-4 mx-auto h-80">
                <div className="float-left text-left">
                  <span className="text-xl">Name | </span>
                  <span>{Profile.nickname}</span>
                </div>
                <div className="float-left text-left">
                  <span className="text-xl">State | </span>
                  <span>{Profile.state}</span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl">Major | </span>
                  <span>{Profile.major}</span>
                </div>

                <div className="float-left text-left">
                  <span className="text-xl">Introduce | </span>
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
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
