import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT_LOGIN = `${import.meta.env.REACT_APP_API_URL}/auth/login`;
const API_ENDPOINT_SESSION = `${import.meta.env.REACT_APP_API_URL}/auth/session`;

export const checkSession = createAsyncThunk(
    'auth/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_ENDPOINT_SESSION);
            return response.data;
        } catch (error) {
            return rejectWithValue('Session invalid or expired');
        }
    }
);

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(API_ENDPOINT_LOGIN, credentials);
            dispatch(loginSuccess(response.data.data)); 
            return response.data;
        } catch (error) {
            if (error.response) {
                dispatch(loginFailure(error.response.data));  
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue('No response was received');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    user: null,
    isLoggedIn: false,
    data: null,
    isLoading: false,
    error: null,
};

const dataSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(checkSession.rejected, (state) => {
                state.isLoggedIn = false;
            });
    },
});

export const { loginSuccess, loginFailure, logout } = dataSlice.actions;
export default dataSlice.reducer;
