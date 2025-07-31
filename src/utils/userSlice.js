import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "CurrentUser",
  initialState: {
    user: [],
    selectedUser: null, // Added selectedUser to track the currently selected user  
    blockedUsers:[],
  },
  reducers:{
    adduser: (state, action) => {
       state.user.push(action.payload);
    },
    removeuser: (state) => {
        state.user.length = 0; // Clear the user array
    },
    addSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // Set the currently selected user
    },
    addToBlockList:(state,action)=>{
      state.blockedUsers.push(action.payload); // Add user to the blocked list
    }
  }
});
export const { adduser, removeuser ,addSelectedUser, addToBlockList} = userSlice.actions;
export default userSlice.reducer;