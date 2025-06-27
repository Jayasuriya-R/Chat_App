import React, {useState} from "react";
import search from "../assets/search.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";

const ChatList = () => {
    const [swapIcon, setSwapIcon] = useState(false);
  return (
    <div className="py-4">
      <div>
        <div className="flex items-center w-full pr-3">
          <div className="relative w-full mr-2">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src={search}
                alt="Search Icon"
                className="w-5 h-5 text-gray-400"/>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
            />
          </div>
          
          <div onClick={()=> setSwapIcon(!swapIcon)} className="bg-gray-800 w-12 h-10 p-1 rounded-lg flex justify-center items-center">
            { !swapIcon ?
          <img
            src={plus}
            alt="Add Chat Icon"
            className="w-5 h-5 text-gray-400 cursor-pointer"/> :
            <img
            src={minus}
            alt="delete Chat Icon"
            className="w-5 h-5 text-gray-400 cursor-pointer"/>}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
