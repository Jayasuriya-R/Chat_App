import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "CurrentUser",
  initialState: {
    user: [],
  },
  reducers:{
    adduser: (state, action) => {
       state.user.push(action.payload);
    },
    removeuser: (state) => {
        state.user.length = 0; // Clear the user array
    }
  }
});
export const { adduser, removeuser } = userSlice.actions;
export default userSlice.reducer;