import React, { use } from "react";
import LeftPannel from "./LeftPannel";
import ChatMain from "./ChatMain";
import Details from "./Details";
import { useSelector, useDispatch } from "react-redux";
import AddUser from "./AddUser";
import BlockUser from "./BlockUser";
import { removeFromBlockList } from "../utils/userSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const msgId = useSelector((store) => store.CurrentUser.selectedUser);
  const showAddUser = useSelector((store) => store.addUserToogle);
  const BlockedUser = useSelector((store) => store.CurrentUser.blockedUsers);
  
  return (
    <div
      className="w-full max-h-screen h-[95vh]  grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15"
      style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
    >
      {/* Left Panel */}
      <div className="lg:col-span-3 h-full border-b lg:border-b-0 lg:border-r border-white/15 overflow-hidden">
        <LeftPannel />
      </div>

      {/* Chat Main */}
      <div
        className={`lg:col-span-6 h-full border-b lg:border-b-0 lg:border-r border-white/15 overflow-hidden`}
      >
        {BlockedUser.includes(msgId?.user?.uid) ? (
          <div className="absolute bottom-0 left-0 top-0 bg-[#111928] py-2 right-0 w-fit h-fit m-auto text-center border border-gray-50 rounded-lg shadow-lg">
            <h1 className="text-lg font-semibold text-center p-4 text-gray-500">
              Remove from block list to chat
            </h1>
            <button
              className="py-1 px-2 rounded-lg bg-red-500 hover:bg-red-600 font-medium text-white cursor-pointer"
             onClick={() => dispatch(removeFromBlockList({ uid: msgId?.user?.uid }))}
            >
              Unblock
            </button>
          </div>
        ) : (
          <>
            {msgId && <ChatMain BlockedUser={BlockedUser} />}
            {showAddUser.addUserToogle && (
              <div className="absolute bottom-0 left-0 top-0 right-0 w-fit h-fit m-auto text-white rounded-lg shadow-lg">
                <AddUser />
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className={`lg:col-span-3 h-full overflow-hidden `}>
        {msgId && <Details BlockedUser={BlockedUser} />}
        {showAddUser.blockUserToggle && (
          <div className=" absolute bottom-0 left-0 top-0 right-0 w-fit h-fit m-auto text-white rounded-lg shadow-lg">
            <BlockUser blockedUser={msgId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
