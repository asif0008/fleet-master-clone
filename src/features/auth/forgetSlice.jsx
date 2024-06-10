import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../axiosConfig/axiosInstance";


const initialState = {
  isLoading: false,
  error: null,
  otpSent: false,
  otpVerified: false
};

export const sendOTP = createAsyncThunk('auth/sendOTP', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/forgotPassword", credentials,);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('http://your-api-url/api/auth/verify-otp', data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const forgetSlice = createSlice({
  name: 'forget',
  initialState,
  reducers: {
    forgetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.otpSent = false;
      state.otpVerified = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.otpVerified = true;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { forgetAuthState } = forgetSlice.actions;
export default forgetSlice.reducer;