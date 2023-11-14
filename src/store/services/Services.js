import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  loading: false,
  error: undefined,
};

export const submitDocument = createAsyncThunk(
  "services/submitDocument",
  async (inputs, { rejectWithValue }) => {
    try {
      const response = await api.post("services/createdocument", inputs);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitDocument.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitDocument.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(submitDocument.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = servicesSlice.actions;

export default servicesSlice;
