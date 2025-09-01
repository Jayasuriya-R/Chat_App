import { useEffect, useState } from "react";
import "./App.css";
import bgImage from "./assets/bg.jpg";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";

function App() {
  const userLoggedIn = useSelector((store) => store.CurrentUser.user);

  return (
    <>
      <div className="flex items-center justify-center  px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="flex items-center justify-center w-full  py-4">
        
          {userLoggedIn.length > 0 ? <MainContainer /> : <Login />}
        </div>
        <Notification />
      </div>
    </>
  );
}

export default App;
