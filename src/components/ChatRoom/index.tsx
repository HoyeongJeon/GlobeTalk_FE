import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface ChatMessageProps {}

const ChatRoom = ({}: ChatMessageProps) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/chats/rooms/${id}`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 201) {
        // 메시지를 성공적으로 보냈을 때 해야할 일
      }
    } catch (error) {}
    setMessage("");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chats/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div>{id}</div>
        </main>
        <form onSubmit={handleSubmit}>
          <div className="relative flex" data-twe-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full border-0 bg-neutral-800 px-3 py-[1rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="input"
              value={message}
              onChange={handleMessage}
            />
            <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 text-center">
              Send
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};
export default ChatRoom;
