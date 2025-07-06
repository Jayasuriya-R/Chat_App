import { configureStore } from "@reduxjs/toolkit";
import addUserToogleReducer from "./addUserToogleSlice";
import CurrentUserReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    addUserToogle: addUserToogleReducer,
    CurrentUser: CurrentUserReducer
  }
})
export default appStore;