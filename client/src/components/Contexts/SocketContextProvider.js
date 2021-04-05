import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "https://realtime-chat-rn.herokuapp.com/";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  //room id and users in room
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomData, setRoomData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
