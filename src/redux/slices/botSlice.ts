import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  text: string;
  sender: "user" | "gemini";
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = botSlice.actions;
export default botSlice.reducer;
