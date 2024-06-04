import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useStore } from "@/stores/store";
import useSocket from "@/hooks/useSocket";
import { AiFillAlert } from "react-icons/ai";

interface ChatMessageProps {}
interface ChatParterProps {
  id: number;
  nickname: string;
}

const ChatRoom = ({}: ChatMessageProps) => {
  const { id: userId } = useStore((state) => state);
  const { id: roomId } = useParams<{ id: string }>();
  const [socket, disconnect] = useSocket(Number(roomId));
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [chatParter, setChatPartner] = useState<ChatParterProps>();
  const [checkedReason, setCheckedReason] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // 스크롤을 위한 ref
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const value = e.target.id;
    if (isChecked) {
      setCheckedReason([...checkedReason, value]);
    } else {
      setCheckedReason(checkedReason.filter((reason) => reason !== value));
    }
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkedReason.length === 0) {
      alert("Please select a reason");
      return;
    }
    try {
      console.log(roomId);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/report`,
        {
          chatId: roomId,
          reporterId: userId,
          reporteeId: chatParter?.id,
          reason: JSON.stringify(checkedReason),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        alert("Reported successfully");
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;

    let tempTime = new Date();
    tempTime.setHours(tempTime.getHours() + 9);
    let tempMessage = {
      id: messages.length + 1,
      message: message,
      createdAt: tempTime.toISOString(),
      Author: {
        Profile: {
          id: userId,
          nickname: "",
        },
      },
    };

    setMessages([...messages, tempMessage]);

    socket?.emit("send_message", {
      message: message,
      chatId: roomId,
    });

    setMessage("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket?.on("receive_message", (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chats/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setChatPartner({
          id: res.data.result.Users[0].id,
          nickname: res.data.result.Users[0].Profile.nickname,
        });
        let messages = res.data.result.Messages.map((message: any) => {
          let time = new Date(message.createdAt);
          time.setHours(time.getHours() + 9);
          return {
            ...message,
            createdAt: time.toISOString(),
          };
        });
        setMessages(messages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMessages]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex justify-between items-center px-4 py-2 font-mono text-3xl font-bold w-auto">
          <div className="flex-1 text-center">{chatParter?.nickname}</div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-2xl">
                <AiFillAlert />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Report</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleReportSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-4">
                    <label htmlFor="swearing">
                      <input
                        id="swearing"
                        type="checkbox"
                        onChange={onChangeCheckbox}
                      />
                      <span className="text-sm"> Swearing(욕설)</span>
                    </label>
                    <label htmlFor="dirty">
                      <input
                        id="dirty"
                        type="checkbox"
                        onChange={onChangeCheckbox}
                      />
                      <span className="text-sm"> Dirty talk(음담패설)</span>
                    </label>
                  </div>
                </div>
                {/* <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-4">
                    <label htmlFor="date">Date(eg. 211231 23 59)</label>
                    <input
                      id="date"
                      placeholder="YYMMDD Hour Minute"
                      value={date}
                      className="col-span-3"
                      maxLength={12}
                      onChange={handleDate}
                    />
                  </div>
                </div> */}
                <DialogFooter>
                  <button>Report</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <main className="flex flex-col w-full flex-1 px-20 text-center overflow-scroll ">
          <br />
          {messages.map((message) =>
            message.Author.Profile.id === userId ? (
              <div className="flex justify-end my-0.5">
                <div className="flex items-start gap-2.5">
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-tr-none rounded-tl-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.createdAt.slice(11, 16)}
                      </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white text-left">
                      {message.message}
                    </p>
                    {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Delivered
                    </span> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start my-0.5">
                <div className="flex items-start gap-2.5">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Jese image"
                  />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {message.Author.Profile.nickname}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.createdAt.slice(11, 16)}
                      </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                      {message.message}
                    </p>
                    {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Delivered
                    </span> */}
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
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
