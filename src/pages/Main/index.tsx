import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { useRecommendedUserStore } from "@/stores/recommendedUserStore";
import axios from "axios";
import { useEffect } from "react";

export default function Main() {
  const {
    nickname,
    introduce,
    imageUrl,
    id,
    language,
    major,
    User: { country },
    setUserInfo,
  } = useRecommendedUserStore((state) => state);
  useEffect(() => {
    const getRecommendedUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/chats/random`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response;
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecommendedUser();
  }, []);
  const handleNext = () => {
    const getRecommendedUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/chats/random`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response;
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecommendedUser();
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Welcome to GlobeTalk</h1>
          </div>
          <div className="relative">
            <div className="w-80 h-80 justify-center">
              <Modal
                imageUrl={imageUrl}
                nickname={nickname}
                introduce={introduce}
                language={language}
                major={major}
                country={country}
              />
              <div className="p-4 mx-auto">
                <p className="text-sm font-normal tracking-normal text-gray-800 tk-brandon-grotesque">
                  {nickname}
                </p>
                <h2 className="text-base tracking-normal text-gray-800 pb-0 mb-0 tk-brandon-grotesque">
                  {introduce}
                </h2>
              </div>

              <div className="w-full flex flex-nowrap justify-center gap-10">
                <Button
                  content="Request"
                  onClick={() => {
                    console.log("Click Request");
                  }}
                />

                <Button content="Next" onClick={handleNext} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
