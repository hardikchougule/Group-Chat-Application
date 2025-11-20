import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import { Client } from "@stomp/stompjs";
import { getMessages } from "../services/RoomService";
import { timeAgoInMinutes } from "../config/Helper";
function ChatPage() {
  const { roomId, currentUser, connected, setConnected,  setRoomId,
      setCurrentUser } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);
  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([
   
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);


  //page init:
  //message ko load karna honga
 useEffect(() => {
  async function loadMessages() {
    if (!roomId) return; // ✅ Prevent invalid API request
    try {
      const messages = await getMessages(roomId);
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  }
  loadMessages();
}, [roomId]);

//scroll down
  useEffect(()=>{
  if(chatBoxRef.current){
    chatBoxRef.current.scroll({
      top:chatBoxRef.current.scrollHeight,
      behavior:"smooth",
    });
  }
  },[messages])

  //stompClient ko init karna honga
  //subscribe
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}/chat`), // ✅ SockJS factory
      reconnectDelay: 5000, // ✅ Auto-reconnect every 5s
      debug: (str) => console.log(str), // Optional
    });

    client.onConnect = () => {
      toast.success("Connected ✅");

      client.subscribe(`/topic/room/${roomId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, newMessage]);
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"]);
    };

    client.activate(); // ✅ Start connection
    setStompClient(client);

    return () => {
      client.deactivate(); // ✅ Clean up on exit
    };
  }, [roomId]);

function sendMessage() {
  if (stompClient && connected && input.trim()) {
    const message = {
      sender: currentUser,
      content: input,
      roomId: roomId,
    };

    stompClient.publish({
      destination: `/app/sendMessage/${roomId}`,
      body: JSON.stringify(message),
    });

    setInput("");
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

useEffect(() => {
  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, [input, stompClient, connected]);

function handleLogout() {

  if (stompClient) {
    stompClient.deactivate();  // ✅ instead of stompClient.disconnect()
  }

  setConnected(false);
  setRoomId("");
  setCurrentUser("");

  navigate("/");
}

  return (
    <div className="">
      {/* This is a  header Portion */}
      <header className="dark:border-gray-700 h-20 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        {/* Room Name Container */}
        <div className="">
          <h1 className="text-2xl font-semibold">
            Room: <span>{roomId}</span>
          </h1>
        </div>

        {/* Username Container */}
        <div>
          <h1 className="text-2xl font-semibold">
            User: <span>{currentUser}</span>
          </h1>
        </div>

        {/* button: leave room */}
        <div>
          <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      {/* Main content */}
     <main
  ref={chatBoxRef}
  className="pt-24 px-10 border w-2/3 dark:bg-slate-600 mx-auto overflow-auto"
  style={{ height: "calc(100vh - 100px)" }}
>

       {messages.map((message, index) => (
  <div
    key={index}
    className={`flex ${
      message.sender === currentUser ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`my-2 ${
        message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
      } p-2 max-w-xs rounded`}
    >
      <div className="flex flex-row gap-2">
        <img
          className="h-10 w-10"
          src={"https://avatar.iran.liara.run/public/38"}
          alt="image not found"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">{message.sender}</p>
          <p>{message.content}</p>
         <p className="text-xs text-gray-400 opacity-70">{timeAgoInMinutes(message.timestamp)}</p>

        </div>
      </div>
    </div>
  </div>
))}

      </main>

      {/* Input Message Container */}
      <div className="fixed bottom-4 w-full h-16">
        <div className="h-full pr-10 gap-2 flex items-center justify-between border w-1/2 mx-auto dark:bg-gray-900 rounded-full">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type your text here.."
            className=" w-full dark:border-gray-600 dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none"
          />
          <div className="flex gap-1">
            <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
