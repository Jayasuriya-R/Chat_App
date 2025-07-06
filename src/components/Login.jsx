import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { adduser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
import fetchUserDetails from "../Hooks/fetchUserdetails"; // Assuming this is a custom hook to fetch user details

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
   
  const handleAvatar = (e) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSignin = async () => {
    if (!email || !password || !userName) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);
     
      await setDoc(doc(db, "users", res.user.uid), {
        username: userName,
        email,
        uid: res.user.uid,
        avatar: avatar?.url || "https://picsum.photos/200/300",
        blocked: [],
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      toast.success("Signed Up Successfully");
      fetchUserDetails(res.user.uid,dispatch);
      // dispatch(
      //   adduser({
      //     userId : res.user.uid,
      //     username: userName,
      //     email,
      //   })
      // )
    } catch (err) {
      console.error(err);
      toast.error("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);
      fetchUserDetails(res.user.uid,dispatch);
      toast.success("Logged In Successfully");

      // dispatch(
      //   adduser({
      //     userId : res.user.uid,
      //     username: userName,
      //     email,
      //   })
      // );
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-full p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15"
      style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
    >
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <OrbitProgress color="#7d97d6" size="medium" />
        </div>
      ) : (
        <div className="flex flex-col space-y-8 h-full items-center justify-center">
          <h1 className="text-3xl font-bold">{!signUp ? "Log In" : "Sign Up"}</h1>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              signUp ? handleSignin() : handleLogin();
            }}
          >
            {/* Avatar Upload */}
            <div
              className={`flex items-center justify-end mb-3 transition-all duration-300 ${
                signUp ? "opacity-100 visible" : "opacity-0 invisible h-0"
              }`}
            >
              <img
                src={avatar.url || "https://picsum.photos/200/300"}
                className="w-5 h-5 rounded-full mr-3"
                alt="Avatar"
              />
              <label htmlFor="file" className="cursor-pointer text-[#a5a5a5]">
                Upload an image
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleAvatar}
              />
            </div>

            {/* Username Input */}
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full p-2 my-4 rounded bg-gray-800 border border-gray-700 text-white transition-all duration-300 ${
                signUp ? "opacity-100 visible" : "opacity-0 invisible h-0"
              }`}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
            />

            <button
              type="submit"
              className="w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {!signUp ? "Log In" : "Sign Up"}
            </button>

            <p
              className="cursor-pointer text-white hover:underline text-sm"
              onClick={() => setSignUp(!signUp)}
            >
              {!signUp
                ? "New to the chat? Sign Up Now"
                : "Already registered? Sign In"}
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
