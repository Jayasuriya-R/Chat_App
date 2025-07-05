import { configureStore } from "@reduxjs/toolkit";
import addUserToogleReducer from "./addUserToogleSlice";

const appStore = configureStore({
  reducer: {
    addUserToogle: addUserToogleReducer
  }
})
export default appStore;