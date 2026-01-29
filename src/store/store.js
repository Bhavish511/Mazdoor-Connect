import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workersReducer from './slices/workersSlice';
import bookingsReducer from './slices/bookingsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        workers: workersReducer,
        bookings: bookingsReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
