import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import paddyReducer from './slices/paddySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        paddy: paddyReducer,
    },
});
