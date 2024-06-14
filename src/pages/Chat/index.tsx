import ChatPreview from "@/components/ChatPreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Chat() {
  const [chatPreview, setChatPreview] = useState<any[]>([]);
  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/chats/rooms`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("res");
        console.log(res);
        setChatPreview(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getChatRooms();
  }, [setChatPreview]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="pb-3.5">
            <h1 className="text-6xl font-bold pb-3.5">Chats</h1>
          </div>
          {chatPreview.map((chat) => (
            <ChatPreview
              key={chat.id}
              chatId={chat.id}
              nickname={chat.Users[0].Profile.nickname}
              currentMessage={
                chat.currentMessage[0]?.message
                  ? chat.currentMessage[0]?.message
                  : "No message arrived yet"
              }
              time={chat.currentMessage[0]?.createdAt}
              profileImage={chat.Users[0].Profile.profileImage}
            />
          ))}
        </main>
        <Footer />
      </div>
    </>
  );
}
