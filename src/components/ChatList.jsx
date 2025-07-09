import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { setAddUserToogle } from "../utils/addUserToogleSlice";
import fetchChatDetails from "../Hooks/fetchChatdetails";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; // Adjust the import path as necessary
import { getDoc } from "firebase/firestore"; // Import getDoc to fetch user details

const ChatList = () => {
  const diptach = useDispatch();
  const swapIcon = useSelector((store) => store.addUserToogle.addUserToogle);
  const user = useSelector((store) => store.CurrentUser.user);
  const [chats, setChats] = useState([]);

  // ✅ This ensures a stable array length
  
useEffect(() => {
  if (!user[0].uid) return; // Guard clause

  const unsub = onSnapshot(doc(db, "userChats", user[0].uid), async (res) => {
  
   const items = res.data()?.chats || [];
   
       const promises = items.map(async (item) => {
         const userDocRef = doc(db, "users", item.receiverId); // or item.users.uid if that's your field
         const userDocSnap = await getDoc(userDocRef);
         const user = userDocSnap.exists() ? userDocSnap.data() : null;
         return { ...item, user };
       });
   
       const chatData = await Promise.all(promises);
       const sorted = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
       setChats(sorted); // send to state
    console.log("Chats updated:", items);
  
});

  return () => unsub();
}, [user[0]?.uid]);

// console.log("Chats:", user);


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
          />
        </div>

        {/* Toggle Button */}
        <div
        
          onClick={() =>{  diptach(setAddUserToogle())}}
          className="bg-gray-800 w-12 h-10 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <img
            src={swapIcon ? minus : plus}
            alt={swapIcon ? "Delete Chat Icon" : "Add Chat Icon"}
            className="w-4 h-4 text-gray-400"
          />
        </div>
      </div>
      <div className="mt-3 pr-3 h-[450px] overflow-y-auto" style={{
    msOverflowStyle: 'none', /* IE and Edge */
    scrollbarWidth: 'none',  /* Firefox */
  }}> 
      {console.log("Chats:", chats)}
      {
      chats?.map((x,index) => (
        <Chat key={index} name={x.user.username} />
      ))}
      </div>
    </div>
  );
};

export default ChatList;
