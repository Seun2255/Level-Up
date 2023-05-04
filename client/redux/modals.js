import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModal: false,
  succesModal: false,
  succesModalText: "",
  createRoomModal: false,
  viewRoomModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setWalletModal: (state, action) => {
      state.walletModal = action.payload;
    },
    setCreateRoomModal: (state, action) => {
      state.createRoomModal = action.payload;
    },
    setViewRoomModal: (state, action) => {
      state.viewRoomModal = action.payload;
    },
    setSuccesModal: (state, action) => {
      state.succesModalText = action.payload.text;
      state.succesModal = action.payload.open;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWalletModal,
  setCreateRoomModal,
  setSuccesModal,
  setViewRoomModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
