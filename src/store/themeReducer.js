import { createSlice } from "@reduxjs/toolkit";

export const getTheme = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = getTheme.actions;

export default getTheme.reducer;
