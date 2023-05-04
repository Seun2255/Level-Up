import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tab";
import userReducer from "./user";
import modalsReducer from "./modals";
import roomsReducer from "./rooms";
import videosReducer from "./videos";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    user: userReducer,
    modals: modalsReducer,
    rooms: roomsReducer,
    videos: videosReducer,
  },
});
