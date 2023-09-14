import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginToken: "",
  },
  reducers: {
    changeLoginStatus: (state, action) => {
      state.loginToken = action.payload;
    },
  },
});
export const { changeLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;
