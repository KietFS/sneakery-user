import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

export type IInputMode = "INPUT_OTP" | "INPUT_PHONE_NUMBER";
interface IInitialState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: IInitialState = {
  isAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<boolean>) => {
      state.isAuth = actions.payload;
    },
    setUser: (state, actions: PayloadAction<IUser | null>) => {
      state.user = actions.payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
