import React from "react";

interface ChatMessageProps {
  profileImage: string;
  name: string;
  message: string;
  time: string;
}

const ChatMessage = ({
  profileImage,
  name,
  message,
  time,
}: ChatMessageProps) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 max-w-2xl mx-auto">
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4">
        <div className="flex items-center">
          <span className="font-bold text-lg">{name}</span>
          <div className="flex-1 border-l border-gray-300 mx-4"></div>
          <span className="text-gray-500 text-sm">{time}</span>
        </div>
        <p className="text-md text-gray-800">{message}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
