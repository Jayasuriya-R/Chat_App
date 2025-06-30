import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import phone from "../assets/phone.png";
import video from "../assets/video.png";
import info from "../assets/info.png";
import camera from "../assets/camera.png";
import mic from "../assets/mic.png";
import img from "../assets/img.png";
import emoji from "../assets/emoji.png";
import EmojiPicker from "emoji-picker-react";

const ChatMain = () => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col h-full pr-2">
      {/* Chat Header */}
      <div className="p-3 border-b border-white/15">
        <div className="flex items-center justify-between">
          {/* Avatar and Name */}
          <div className="flex items-center gap-2">
            <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
            <div className="text-left">
              <h1 className="text-sm font-bold">Surya</h1>
              <span className="text-xs text-[#a5a5a5] font-normal">
                Busy at work
              </span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <img
              src={phone}
              alt="Phone Icon"
              className="w-5 h-5 cursor-pointer"
            />
            <img
              src={video}
              alt="Video Icon"
              className="w-5 h-5 cursor-pointer"
            />
            <img
              src={info}
              alt="Info Icon"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2"style={{
    msOverflowStyle: 'none', /* IE and Edge */
    scrollbarWidth: 'none',  /* Firefox */
  }}>
        {/* Map messages here */}
        {/* <ChatBubble /> */}
        {/* Incoming Message (Left) */}
        <div className="flex items-start gap-2 max-w-[70%] mb-2">
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="bg-gray-800 text-white text-left p-2 rounded-lg w-fit">
              <p>Hello! How are you?</p>
            </div>
            {/* Place time span just below the message and aligned to the start */}
            <div className="flex items-start mt-1">
              <span className="text-xs text-gray-400 block">10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Outgoing Message (Right) */}
        <div className="flex justify-end gap-2 max-w-[70%] ml-auto mb-2">
          <div>
            <div className="bg-blue-500 text-white text-left p-2 rounded-lg w-fit">
              <p>Hello! How are you?</p>
            </div>
            <div className="mt-1 flex items-start">
              <span className="text-xs  text-gray-400 block">10:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Section */}
      <div className="flex items-center p-3 gap-4 border-t border-white/15">
        {/* Media Icons */}
        <div className="flex items-center gap-3">
          <img src={img} alt="Image" className="w-5 h-5 cursor-pointer" />
          <img src={camera} alt="Camera" className="w-5 h-5 cursor-pointer" />
          <img src={mic} alt="Mic" className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Input Field */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg outline-none placeholder:text-[#a5a5a5]"
          />
        </div>

        {/* Emoji & Send */}
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
  );
};

export default ChatMain;
