import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_UID, USER_EMAIL, USER_SESSION_ROLE } from "../constants/localstorage";

import { signInEmailAndPassword, signOut } from "../firestore/services/auth";
import { Auth, CurentUser, UserRoleType } from "../interfaces/authType";

const initialState: Auth = {
  user: {
    userUID: localStorage.getItem(USER_UID) || "",
    email: localStorage.getItem(USER_EMAIL) || "",
    role: (localStorage.getItem(USER_SESSION_ROLE) as UserRoleType) || "",
  },
};

// Thunks
export const signin = createAsyncThunk("auth/signin", async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;
  const response = await signInEmailAndPassword(email, password);
  return response;
});

export const signout = createAsyncThunk("auth/signout", async () => {
  const response = signOut();
  return response;
});

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserUID: (state, action: PayloadAction<Auth>) => {
      state.user = action.payload.user;
    },
    deleteUserUID: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signout.fulfilled, (state) => {
      state.user = { ...initialState.user, userUID: "", email: "", role: "User", displayName: "" };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.user as CurentUser;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveUserUID, deleteUserUID } = authReducer.actions;

export default authReducer.reducer;
