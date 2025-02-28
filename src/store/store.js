import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Import your reducer

const store = configureStore({
    reducer: {
        auth: authSlice // ✅ Add the auth reducer
    }
});

export default store;
