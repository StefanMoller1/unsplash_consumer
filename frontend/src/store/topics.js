import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTopicsAPI } from "../api/unsplash";

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (size, { getState }) => {
    const state = getState().topics;
    if (state.topics.length === 0 && !state.isLoading) {
      return [];
    }
    return await fetchTopicsAPI(size);
  }
);

const initialState = {
  topics: [],
  isLoading: "false",
  activeTopic: "",
};

export const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    updateTopic: (state, action) => {
      state.activeTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        if (action.payload.length !== 0) {
          state.activeTopic = action.payload[0].id;
        }
        state.topics = action.payload;
      });
  },
});

export const { updateTopic } = topicSlice.actions;

export const selectTopics = (state) => state.topics;
export const selectActiveTopic = (state) => state.topics.activeTopic;

export default topicSlice.reducer;
