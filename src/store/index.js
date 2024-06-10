import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import loadingReducer from '../features/loading/loadingSlice';
import dataReducer from '../features/data/dataSlice';
import pageReducer from '../features/page/pageSlice';
import forgetReducer from '../features/auth/forgetSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    data: dataReducer,
    page: pageReducer,
    forget:forgetReducer,
  },
})