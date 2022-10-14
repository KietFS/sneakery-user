import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IInputMode = "INPUT_OTP" | "INPUT_PHONE_NUMBER";
interface IInitialState {
  isDoneFirstTime: boolean;
  user: ILoginResponse | null;
}

const initialState: IInitialState = {
  isDoneFirstTime: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsFirstTime: (state, actions: PayloadAction<boolean>) => {
      state.isDoneFirstTime = actions.payload;
    },
    setUser: (state, actions: PayloadAction<ILoginResponse | null>) => {
      state.user = actions.payload;
    },
  },
});

export const { setIsFirstTime, setUser } = authSlice.actions;
export default authSlice.reducer;
