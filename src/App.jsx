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
  
      <div className="w-screen h-screen flex items-center justify-center bg-[#111928]">
        <div className="w-11/12 h-11/12">
         {
          userLoggedIn.length >0 ?  <MainContainer /> : <Login />
         }
          
        </div>
        <Notification/>
      </div>
    </>
  );
}

export default App;
