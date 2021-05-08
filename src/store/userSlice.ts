import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthenticationService from "../security/AuthenticationService";
import { User, UserCredentails } from "../types/User";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: undefined,
    username: "",
    password: "",
    role: "",
  },
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userCredentails?: UserCredentails) => {
    const user = await AuthenticationService.logIn(userCredentails);
    return user as User;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
