import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./topics";
import imagesReducer from "./images";

export const store = configureStore({
  reducer: {
    topics: topicReducer,
    images: imagesReducer,
  },
});
