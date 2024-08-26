// src/store/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const access_token = localStorage.getItem("access_token") || "";
const user = localStorage.getItem("user") || "";
const initialState = {
  userType: user.role,
  isLogging: !access_token,
  dataUser: {},
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleIsLogging: (state) => {
      state.isLogging = !state.isLogging;
    },
    setIsLogging: (state, action) => {
      state.isLogging = action.payload;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleUsertype: (state) => {
      state.userType = "";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUsername: (state, action) => {
      state.dataUser = action.payload;
    },
  },
});

export const {
  toggleIsLogging,
  setIsLogging,
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleUsertype,
  setUserType,
  setUsername,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
