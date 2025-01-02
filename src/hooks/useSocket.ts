import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
   const [socket, setSocket] = useState<Socket | null>(null);

   useEffect(() => {
      const socketInstance: Socket = io("/api/socket");
      setSocket(socketInstance);

      return () => {
         socketInstance.disconnect();
      };
   }, []);

   return socket;
};
