import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversationsApi, getMessagesApi, sendMessageApi } from "./chatApi";

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

export const getConversations = createAsyncThunk(
  "ai/conversations",
  async (_, thunkAPI) => {
     try {
      const data = await getConversationsApi();
      return data.conversations;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
)

export const getMessage = createAsyncThunk(
  "ai/message",
  async (conversationId, thunkAPI) => {
     try {
      const data = await getMessagesApi(conversationId);
      return data.messages;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
)

const aiBotSlice = createSlice({
  name: "aibot",
  initialState: {
    message: [],
    conversations: null,
    status: "idle",       
    statusCheck: "idle", 
    error: null,
  },
  reducers :{
    addMessage: (state, action) => {
    const { sender, content } = action.payload;    
    state.message = [...state.message, { sender, content }];
  },
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
        if(action.payload.response){
          state.message = [...state.message, action.payload.response];
        }
        if (action.payload.conversation) {
          state.conversations = [action.payload.conversation, ...state.conversations];
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //conversations
      .addCase(getConversations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //messages
      .addCase(getMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = [...action.payload];
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const {addMessage} = aiBotSlice.actions;

export default aiBotSlice.reducer;
