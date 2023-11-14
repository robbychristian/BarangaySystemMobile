import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/User";
import barangaySlice from "./announcements/BarangayNews";
import servicesSlice from "./services/Services";

export const combinedReducers = combineReducers({
  auth: authSlice.reducer,
  barangay: barangaySlice.reducer,
  services: servicesSlice.reducer,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
