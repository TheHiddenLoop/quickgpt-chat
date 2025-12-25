import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessageApi } from "./chatApi";

export const sendMessage = createAsyncThunk(
  "ai/chat",
  async (formData, thunkAPI) => {
    try {
      const data = await sendMessageApi(formData);
      console.log(data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const aiBotSlice = createSlice({
  name: "aibot",
  initialState: {
    message: null,
    status: "idle",       
    statusCheck: "idle", 
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // message to bot
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default aiBotSlice.reducer;
