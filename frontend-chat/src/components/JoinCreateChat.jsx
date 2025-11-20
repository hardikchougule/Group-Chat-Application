import { useState } from "react";
import chatIcon from "../assets/speak.png";
import { toast } from "react-toastify";
import { createRoom as createroomapi, joinChatapi } from "../services/RoomService";
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function formInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  async function joinChat(){
    if(validateForm()){
      //join chat
      try{
     const room = await joinChatapi(detail.roomId);
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      }catch(error){
         if (error.response && error.response.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
         console.log(error);
      }
    }
  }

 async function createRoom() {
  if (validateForm()) {
    try {
      const room = await createroomapi(detail.roomId);
      toast.success("Room Created Successfully ✅");

      setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);
      navigate("/chat");

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  }
}


  function validateForm() {
    if (detail.roomId.trim() === "" || detail.userName.trim() === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src={chatIcon} alt="Img not found" className="w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room
        </h1>

        <div>
          <label className="block font-medium mb-2">
            Your Name
          </label>
          <input
            onChange={formInputChange}
            value={detail.userName}
            name="userName"
            type="text"
            placeholder="Enter the Name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Room ID / New Room Id
          </label>
          <input
            onChange={formInputChange}
            value={detail.roomId}
            name="roomId"
            type="text"
            placeholder="Enter the room Id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full"
          />
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button onClick={joinChat} className="px-3 py-2 dark:bg-blue-500 rounded-full">
            Join Room
          </button>
          <button onClick={createRoom} className="px-3 py-2 dark:bg-orange-500 rounded-full">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
