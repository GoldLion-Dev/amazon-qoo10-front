import { createSlice } from "@reduxjs/toolkit";

export const reListingSlice = createSlice({
  name: "reListingSlice",
  initialState: {
    isSuccess: false,
    status: "",
  },
  reducers: {
    setShowToastForReList: (state, action) => {
      state.isSuccess = action.payload;
    },
    setResultStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setShowToastForReList, setResultStatus } =
  reListingSlice.actions;
export default reListingSlice.reducer;
