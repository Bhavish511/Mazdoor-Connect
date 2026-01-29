import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookings: [],
    selectedBooking: null,
    isLoading: false,
    error: null,
    statusFilter: 'all',
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        fetchBookingsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchBookingsSuccess: (state, action) => {
            state.isLoading = false;
            state.bookings = action.payload;
        },
        fetchBookingsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addBooking: (state, action) => {
            state.bookings.unshift(action.payload);
        },
        updateBooking: (state, action) => {
            const index = state.bookings.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = { ...state.bookings[index], ...action.payload.updates };
            }
        },
        setSelectedBooking: (state, action) => {
            state.selectedBooking = action.payload;
        },
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        cancelBooking: (state, action) => {
            const booking = state.bookings.find((b) => b.id === action.payload);
            if (booking) {
                booking.status = 'cancelled';
            }
        },
    },
});

export const {
    fetchBookingsStart,
    fetchBookingsSuccess,
    fetchBookingsFailure,
    addBooking,
    updateBooking,
    setSelectedBooking,
    setStatusFilter,
    cancelBooking,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
