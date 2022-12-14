import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import filter from "./filter";

export const reducer = combineReducers({
  auth,
  filter,
});
