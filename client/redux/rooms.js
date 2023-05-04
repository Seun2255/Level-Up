import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestions } = roomsSlice.actions;

export default roomsSlice.reducer;
