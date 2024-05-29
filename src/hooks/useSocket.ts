import io from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.domain.com"
    : "http://localhost:3000";

const sockets: { [key: string]: Socket } = {};

const useSocket = (roomId?: number): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (roomId && sockets[roomId]) {
      console.log("소켓 연결 끊음");
      sockets[roomId].disconnect();
      delete sockets[roomId];
    }
  }, [roomId]);

  if (!roomId) {
    return [undefined, disconnect];
  }

  if (!sockets[roomId]) {
    sockets[roomId] = io(`${backUrl}/chats/${roomId}`, {
      transports: ["websocket"],
      query: {
        token: localStorage.getItem("accessToken"),
      },
    });

    console.info("create socket", roomId, sockets[roomId]);
    sockets[roomId].on("connect_error", (err) => {
      console.error(err);
      console.log(`connect_error due to ${err.message}`, err);
    });
  }
  return [sockets[roomId], disconnect];
};

export default useSocket;
