import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    messages: [],
    socket: null,
    onlineUsers: []
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSocket: (state, action)=>{
      state.socket = action.payload
    },
    setOnlineUsers: (state, action)=>{
      state.onlineUsers = Array.isArray(action.payload) ? action.payload : []
    }
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setMessages, setSocket , setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;