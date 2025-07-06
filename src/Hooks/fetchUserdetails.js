import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; // Adjust the import path as necessary
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";

const fetchUserDetails = async (userId,dispatch) => {
  
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    dispatch(adduser(docSnap.data()))
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
export default fetchUserDetails;
