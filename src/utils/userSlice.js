import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "CurrentUser",
  initialState: {
    user: [],
    selectedUser: [], // Added selectedUser to track the currently selected user  
  },
  reducers:{
    adduser: (state, action) => {
       state.user.push(action.payload);
    },
    removeuser: (state) => {
        state.user.length = 0; // Clear the user array
    },
    addSelectedUser: (state, action) => {
      state.selectedUser.push(action.payload); // Set the currently selected user
    },
  }
});
export const { adduser, removeuser ,addSelectedUser} = userSlice.actions;
export default userSlice.reducer;