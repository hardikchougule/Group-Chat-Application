import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <ChatContext.Provider value={{
      roomId,
      currentUser,
      connected,
      setRoomId,
      setCurrentUser,   // ✅ correct name
      setConnected      // ✅ correct name
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook
export default function useChatContext() {
  return useContext(ChatContext);
}
