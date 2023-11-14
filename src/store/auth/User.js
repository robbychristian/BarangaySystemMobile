import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  loading: false,
  user: [],
  token: undefined,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (inputs, { rejectWithValue }) => {
    const { email, password, device_name } = inputs;
    try {
      const response = await api.post("mobilelogin", {
        email: email,
        password: password,
        device_name: device_name,
      });

      return response.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (inputs, { rejectWithValue }) => {
    const { name, email, password, confirmPassword } = inputs;
    try {
      const response = await api.post("register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      return response.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (inputs, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await api.post(
        "logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.token,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = [];
      state.token = undefined;
      AsyncStorage.removeItem("user");
    },
    getToken: (state) => {
      console.log(state.token);
      return state.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice;
