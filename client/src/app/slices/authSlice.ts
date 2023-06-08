import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },

    removeToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
