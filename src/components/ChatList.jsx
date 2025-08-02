import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddUserToogle,
  setBlockUserToogleFalse,
} from "../utils/addUserToogleSlice";
import { UnSeenChat } from "./Chat";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; // Adjust the import path as necessary
import { getDoc } from "firebase/firestore"; // Import getDoc to fetch user details
import { ThreeDot } from "react-loading-indicators";
import { addChatList } from "../utils/userSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const swapIcon = useSelector((store) => store.addUserToogle.addUserToogle);
  const user = useSelector((store) => store.CurrentUser.user);
  const chatList = useSelector((store) => store.CurrentUser.chatList);
  const [chats, setChats] = useState([]);

  // ✅ This ensures a stable array length

  useEffect(() => {
    if (!user[0].uid) return; 

    const unsub = onSnapshot(doc(db, "userChats", user[0].uid), async (res) => {
      const items = res.data()?.chats || [];

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId); 
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.exists() ? userDocSnap.data() : null;
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      const sorted = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
     
      dispatch(addChatList(sorted));
      setChats(sorted); // update Redux store
     
    });

    return () => unsub();
  }, [user[0]?.uid]);


  const handleSelect = async (chat) => {
    const updatedChats = chats.map((item) => {
      if (item.chatId === chat.chatId) {
        return { ...item, isSeen: true };
      }
      return item;
    });

    const userChatsRef = doc(db, "userChats", user[0].uid);

    try {
      await updateDoc(userChatsRef, {
        chats: updatedChats,
      });

      dispatch(addSelectedUser(chat)); // update Redux if needed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-4 px-2 w-full">
      <div className="flex items-center w-full gap-3 pr-3">
        {/* Search Input with Icon */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={search}
              alt="Search Icon"
              className="w-5 h-5 text-gray-400"
            />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase().trim();

              if (searchTerm === "") {
                // Reset to full list when search is empty
                setChats(chatList);
              } else {
                // Filter and set results (even if empty)
                const filteredChats = chatList.filter((chat) =>
                  chat.user.username.toLowerCase().includes(searchTerm)
                );
                setChats(filteredChats);
              }
            }}
          />
        </div>

        {/* Toggle Button */}
        <div
          onClick={() => {
            dispatch(setAddUserToogle());
            dispatch(setBlockUserToogleFalse());
          }}
          className="bg-gray-800 w-12 h-10 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <img
            src={swapIcon ? minus : plus}
            alt={swapIcon ? "Delete Chat Icon" : "Add Chat Icon"}
            className="w-4 h-4 text-gray-400"
          />
        </div>
      </div>
      <div
        className="mt-3 pr-3 h-[450px] overflow-y-auto"
        style={{
          msOverflowStyle: "none" /* IE and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        {/* {console.log("Chats:", chats)} */}
        {chats.length == 0 ? (
          <div className="flex justify-center items-center h-full">
            <ThreeDot
              variant="bounce"
              color="#76a0c9"
              size="small"
              text=""
              textColor=""
            />
          </div>
        ) : (
          chats?.map((x, index) => (
            <React.Fragment key={index}>
              {x.isSeen ? (
                <>
                  <Chat
                    name={x.user.username}
                    id={x}
                    msg={x.lastMessage}
                    seen={true}
                  />
                  <hr className="border-white/15 my-1" />
                </>
              ) : (
                <>
                  <UnSeenChat
                    name={x.user.username}
                    id={x}
                    msg={x.lastMessage}
                    handleSelect={handleSelect}
                  />
                  <hr className="border-white/15 my-1" />
                </>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
