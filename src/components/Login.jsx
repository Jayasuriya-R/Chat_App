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
import { FaEnvelope, FaImage, FaLock, FaUser } from "react-icons/fa";

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
      await fetchUserDetails(res.user.uid, dispatch);
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
      await fetchUserDetails(res.user.uid, dispatch);
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
    <div className="flex items-center justify-center w-full min-h-screen px-4">
      <div
        className="relative w-full max-w-md p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-transparent"
        style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient">
          <div
            className="w-full h-full rounded-lg"
            style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
          ></div>
        </div>

        <div className="relative z-10">
          {loading ? (
            <div className="flex h-full justify-center items-center">
              <OrbitProgress color="#7d97d6" size="medium" />
            </div>
          ) : (
            <div className="flex flex-col space-y-2 h-full items-center justify-center">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {!signUp ? "Log In" : "Sign Up"}
              </h1>
              <form
                className="w-full px-2 sm:px-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  signUp ? handleSignin() : handleLogin();
                }}
              >
                {/* Avatar Upload */}
                <div
                  className={`flex items-center justify-end mb-3 transition-all duration-300 ${
                    signUp ? "opacity-100 block" : "opacity-0 hidden"
                  }`}
                >
                  <img
                    src={avatar.url || "https://picsum.photos/200/300"}
                    className="w-10 h-10 rounded-full mr-3 sm:w-12 sm:h-12"
                    alt="Avatar"
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer text-[#a5a5a5] text-sm sm:text-base flex items-center gap-2"
                  >
                    <FaImage /> Upload
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleAvatar}
                  />
                </div>

                {/* Username Input */}
                {signUp && (
                  <div className="relative mb-3">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm sm:text-base"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="relative mb-3">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm sm:text-base"
                  />
                </div>

                {/* Password */}
                <div className="relative mb-3">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-2 mb-3 bg-blue-600 font-medium text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {!signUp ? "Log In" : "Sign Up"}
                </button>

                <p
                  className="cursor-pointer text-white hover:underline text-xs sm:text-sm text-center"
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
      </div>
    </div>
  );
};

export default Login;
