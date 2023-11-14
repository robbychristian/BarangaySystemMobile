import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  loading: false,
  news: [],
  error: undefined,
};

export const getBarangayNews = createAsyncThunk(
  "barangay/getBarangayNews",
  async (inputs, { rejectWithValue }) => {
    try {
      const response = await api.get("announcements/getallnews");
      return response.data;
    } catch (err) {
      return err.response;
    }
  }
);

const barangaySlice = createSlice({
  name: "barangay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBarangayNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBarangayNews.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.news = payload;
    });
    builder.addCase(getBarangayNews.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = barangaySlice.actions;

export default barangaySlice;
