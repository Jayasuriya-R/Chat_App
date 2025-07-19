import React, { useState, useRef, useEffect, use } from "react";
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
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const ChatMain = () => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const endRef = useRef(null);
  const [text, setText] = useState("");

  const msgID = useSelector((store) => store.CurrentUser.selectedUser);
  const user = useSelector((store) => store.CurrentUser.user[0]);
  const showAddUser = useSelector((store) => store.addUserToogle.addUserToogle);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or updates
    const scrollToBottom = () => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [msg]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", msgID.chatId), (res) => {
      setMsg(res.data());
    });

    return () => unSub();
  }, [msgID.chatId]);
  // console.log(msg);

  const handleSend = async () => {
    if (text === "") return;

    try {
      // Update messages in the chat document
      await updateDoc(doc(db, "chats", msgID.chatId), {
        messages: arrayUnion({
          senderId: user.uid,
          text: text,
          createdAt: new Date(),
        }),
      });

      const userIds = [user.uid, msgID.user.uid];

      // Update userChats for both sender and receiver
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          console.log("updated chat:", userChatData);
          const chatIndex = userChatData.chats.findIndex(
            (chat) => chat.chatId === msgID.chatId
          );

          if (chatIndex !== -1) {
            // Update the chat metadata
            userChatData.chats[chatIndex].lastMessage = text;
            userChatData.chats[chatIndex].updatedAt = Date.now();
            userChatData.chats[chatIndex].isSeen = id === user.uid;

            // Save the updated data back to Firestore
            await updateDoc(userChatRef, {
              chats: userChatData.chats,
            });
          }
        }
      });

      setText(""); // Clear input if needed
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col h-full pr-2 ${
          showAddUser ? "opacity-30" : ""
        }`}
      >
        {/* ✅ Changed from h-screen to h-full */}
        {/* Chat Header */}
        <div className="p-3 border-b border-white/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={msgID.user.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <h1 className="text-sm font-bold">{msgID.user.username}</h1>
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
          {msg?.messages?.map((x, index) => {
            const isCurrentUser = x.senderId === user.uid;

            return (
              <div
                key={index}
                ref={index === msg.messages.length - 1 ? endRef : null}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                } mb-2`}
              >
                {!isCurrentUser && (
                  <img
                    src={msgID.user.avatar || avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2 self-end"
                  />
                )}

                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`p-2 rounded-lg text-white ${
                      isCurrentUser ? "bg-blue-500 ml-auto" : "bg-gray-800"
                    }`}
                  >
                    <p>{x.text}</p>
                  </div>
                  <span
                    className={`text-xs text-gray-400 mt-1 ${
                      isCurrentUser ? "text-right" : "text-left"
                    }`}
                  >
                    {x.createdAt?.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(); // your function
                }
              }}
              className="w-full p-2 py-3 bg-gray-800 text-white rounded-lg outline-none placeholder:text-[#a5a5a5]"
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
            <button
              className="bg-blue-400 text-white py-1 px-3 rounded-sm text-sm cursor-pointer hover:bg-blue-500"
              onClick={handleSend}
              
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMain;
