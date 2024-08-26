// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";
import validasiKelasSchedule from "./Reduces/validasiKelas";
import kelasSchedule from "./Reduces/kelasReduces";


// Menggabungkan semua reducer
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  userType: userReducer,
  validasiKelas : validasiKelasSchedule,
  kelas : kelasSchedule
  
});

// Konfigurasi store menggunakan configureStore dari Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
