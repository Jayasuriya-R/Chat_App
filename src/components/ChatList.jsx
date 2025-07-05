import React, { useState } from "react";
import search from "../assets/search.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { setAddUserToogle } from "../utils/addUserToogleSlice";

const ChatList = () => {
  const diptach = useDispatch();
  const swapIcon = useSelector((store) => store.addUserToogle.addUserToogle);
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
      {[1, 2, 3, 4, 5,6,7,8,9].map(() => (
        <Chat />
      ))}
      </div>
    </div>
  );
};

export default ChatList;
