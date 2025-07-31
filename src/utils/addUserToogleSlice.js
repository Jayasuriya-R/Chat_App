import { createSlice } from "@reduxjs/toolkit";

const addUserToogleSlice = createSlice({
  name: "addUserToogle",    
  initialState: {
    addUserToogle: false,
  blockUserToggle: false,},
    reducers: {
    setAddUserToogle: (state) => {
      state.addUserToogle = !state.addUserToogle
    },
    setAddUserToogleFalse: (state) => {
      state.addUserToogle = false
    },
    setBlockUserToogleTrue: (state) => {
      state.blockUserToggle = true
    },
    setBlockUserToogleFalse: (state) => {
      state.blockUserToggle = false
    },
}
})

export const { setAddUserToogle,setAddUserToogleFalse, setBlockUserToogleTrue,setBlockUserToogleFalse } = addUserToogleSlice.actions;
export default addUserToogleSlice.reducer;