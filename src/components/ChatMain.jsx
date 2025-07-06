import React, { useState ,useRef, useEffect} from "react";
import avatar from "../assets/avatar.png";
import phone from "../assets/phone.png";
import video from "../assets/video.png";
import info from "../assets/info.png";
import camera from "../assets/camera.png";
import mic from "../assets/mic.png";
import img from "../assets/img.png";
import emoji from "../assets/emoji.png";
import EmojiPicker from "emoji-picker-react";
import AddUser from "./AddUser";
import { useSelector } from "react-redux";

const ChatMain = () => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const endRef = useRef(null);
  const [text, setText] = useState("");
  const showAddUser =  useSelector((store)=> store.addUserToogle.addUserToogle)

  useEffect(() => {
    // Scroll to the bottom when the component mounts or updates
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div className={`flex flex-col h-full pr-2 ${showAddUser ? "opacity-30":""}`}> {/* ✅ Changed from h-screen to h-full */}
      {/* Chat Header */}
      <div className="p-3 border-b border-white/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
            <div className="text-left">
              <h1 className="text-sm font-bold">Surya</h1>
              <span className="text-xs text-[#a5a5a5] font-normal">
                Busy at work
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={phone} alt="Phone" className="w-5 h-5 cursor-pointer" />
            <img src={video} alt="Video" className="w-5 h-5 cursor-pointer" />
            <img src={info} alt="Info" className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Chat Messages (Scrollable) */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {/* Incoming Message */}
        <div className="flex items-start gap-2 max-w-[70%] mb-2">
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="bg-gray-800 text-white text-left p-2 rounded-lg w-fit">
              <p>Hello! How are you?</p>
            </div>
            <div className="flex items-start mt-1">
              <span className="text-xs text-gray-400 block">10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Outgoing Messages */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex justify-end max-w-[70%] ml-auto mb-2">
            <div>
              <div className="bg-blue-500 text-white p-2 rounded-lg w-fit">
                <p>Hey! Message #{index + 1}</p>
              </div>
              <div className="mt-1 flex justify-end">
                <span className="text-xs text-gray-400 block">10:3{index} AM</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} className="flex items-start gap-2 max-w-[70%] mb-2">
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="bg-gray-800 text-white text-left p-2 rounded-lg w-fit">
              <p>Hello! How are you?</p>
            </div>
            <div className="flex items-start mt-1">
              <span className="text-xs text-gray-400 block">10:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-3 gap-4 border-t border-white/15">
        <div className="flex items-center gap-3">
          <img src={img} alt="Image" className="w-5 h-5 cursor-pointer" />
          <img src={camera} alt="Camera" className="w-5 h-5 cursor-pointer" />
          <img src={mic} alt="Mic" className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg outline-none placeholder:text-[#a5a5a5]"
          />
        </div>
        <div className="relative flex items-center gap-2">
          <img
            src={emoji}
            alt="Emoji"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          />
          {emojiPickerVisible && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(e) => {
                  setText((prev) => prev + e.emoji);
                  setEmojiPickerVisible(false);
                }}
              />
            </div>
          )}
          <button className="bg-blue-500 text-white py-1 px-3 rounded-sm text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
    {showAddUser &&
    <div className=" absolute bottom-0 left-0 top-0 right-0 w-fit h-fit m-auto text-white rounded-lg shadow-lg">
       <AddUser />
    </div>
    }
    </>
  );
};

export default ChatMain;
