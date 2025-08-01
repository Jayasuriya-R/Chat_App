import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "CurrentUser",
  initialState: {
    user: [],
    selectedUser: null, // Added selectedUser to track the currently selected user
    blockedUsers: [],
    chatList:null,
  },
  reducers: {
    adduser: (state, action) => {
      state.user.push(action.payload);
    },
    removeuser: (state) => {
      state.user.length = 0; // Clear the user array
    },
    addSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // Set the currently selected user
    },
    addToBlockList: (state, action) => {
      state.blockedUsers.push(action.payload); // Add user to the blocked list
    },
    removeFromBlockList: (state, action) => {
      state.blockedUsers = state.blockedUsers.filter(
        (uid) => uid !== action.payload.uid
      );
    },
    addChatList: (state, action) => {
      state.chatList = action.payload; // Set the chat list
  },
}})
export const {
  adduser,
  removeuser,
  addSelectedUser,
  addToBlockList,
  removeFromBlockList,
  addChatList
} = userSlice.actions;
export default userSlice.reducer;
