import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImagesAPI } from "../api/unsplash";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (key, { getState }) => {
    const imagesState = getState().images;
    if (
      (imagesState.images.hasOwnProperty(key) &&
        imagesState.images[key].length !== 0) ||
      !key ||
      key === ""
    ) {
      return {};
    }

    return await fetchImagesAPI(key);
  }
);

const initialState = {
  images: {},
  isLoading: "false",
};

export const topicSlice = createSlice({
  name: "topics",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.topic) {
          state.images[action.payload.topic] = action.payload.data;
        }
      });
  },
});

export const selectImages = (state) => state.images;

export default topicSlice.reducer;
