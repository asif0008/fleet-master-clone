import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosConfig/axiosInstance";



export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials, );
      return response.data.message;
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
        return rejectWithValue(error.response.data.message || "Login failed");
      }
      return rejectWithValue("No response was received");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout",credentials);
      console.log("Logout successful:", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("Error during logout:", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
        return rejectWithValue(error.response.data.message || "Logout failed");
      }
      return rejectWithValue("No response was received");
    }
  }
);

const initialState = {
  message: null,
  isLoggedIn : localStorage.getItem('user') ? true : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.message = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        // state.isLoggedIn = false;
      })
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;