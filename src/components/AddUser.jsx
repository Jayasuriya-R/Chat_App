import React from "react";
import { collection, query, where, getDocs,doc,setDoc,updateDoc, serverTimestamp } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { db,auth } from "../Firebase/Firebase"; // adjust path if needed
import { useSelector } from "react-redux";

const AddUser = () => {
  const [user, setUser] = React.useState(null); // null is clearer than ""
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((store) => store.CurrentUser.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username").trim();

    if (!username) return;

    try {
      setLoading(true);
      setUser(null); // Reset previous user

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username)); // or use "username" if that's your field

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
      } else {
        console.log("No matching user found.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
  if (!user || !user.uid || !auth.currentUser) {
    console.error("Invalid user data.");
    return;
  }

  const chatRef = collection(db, "chats");
  const userChatsRef = collection(db, "userChats");

  try {
    // Create new chat document
    const newChatRef = doc(chatRef);
    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: [],
    });

    const currentUserId = auth.currentUser.uid;
    const otherUserId = user.uid;

    // Add chat to current user's userChats
    await updateDoc(doc(userChatsRef, currentUserId), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: otherUserId,
        updatedAt: Date.now(),
      }),
    });

    // Add chat to other user's userChats
    await updateDoc(doc(userChatsRef, otherUserId), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUserId,
        updatedAt: Date.now(),
      }),
    });

    console.log("Chat created successfully!");
  } catch (error) {
    console.error("Error adding user to chat:", error);
  }
};

  return (
    <div className="bg-[#111928] opacity-100 p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15">
      <form
        className="flex items-center justify-between gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full p-2 my-4 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 p-2 border-gray-200 rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {user && (
        <div className="p-2 flex items-center gap-3">
          <img
            src={user.avatar || "https://picsum.photos/200/300"}
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-white text-sm">{user.username}</h1>
          <button className="ml-2 p-2 bg-blue-400 rounded-lg cursor-pointer" onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
