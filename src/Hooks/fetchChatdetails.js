import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const fetchChatDetails = (userId, callback) => {
  const unsub = onSnapshot(doc(db, "userChats", userId), async (res) => {
    const items = res.data()?.chats || [];

    const promises = items.map(async (item) => {
      const userDocRef = doc(db, "users", item.receiverId); // or item.users.uid if that's your field
      const userDocSnap = await getDoc(userDocRef);
      const user = userDocSnap.exists() ? userDocSnap.data() : null;
      return { ...item, user };
    });

    const chatData = await Promise.all(promises);
    const sorted = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
    callback(sorted); // send to state
  });

  return unsub; // so caller can unsubscribe
};

export default fetchChatDetails;
