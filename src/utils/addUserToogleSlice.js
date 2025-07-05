import { createSlice } from "@reduxjs/toolkit";

const addUserToogleSlice = createSlice({
  name: "addUserToogle",    
  initialState: {
    addUserToogle: false},
    reducers: {
    setAddUserToogle: (state) => {
      state.addUserToogle = !state.addUserToogle
    },
}
})

export const { setAddUserToogle } = addUserToogleSlice.actions;
export default addUserToogleSlice.reducer;