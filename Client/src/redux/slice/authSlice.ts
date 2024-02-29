import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  userName: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  user: null | IUser;
  accessToken: string;
  isAuthenticate: boolean;
}

const initialState: InitialState = {
  user: null,
  accessToken: "",
  isAuthenticate: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setIsAuthenticate: (state, { payload }) => {
      state.isAuthenticate = payload;
    },
  },
});

export const { setUser, setAccessToken, setIsAuthenticate } = authSlice.actions;
export default authSlice.reducer;
