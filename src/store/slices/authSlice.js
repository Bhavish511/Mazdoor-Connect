import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    isAuthenticated: !!savedUser && !!savedToken,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            state.error = null;
            if (user) localStorage.setItem('user', JSON.stringify(user));
            if (token) localStorage.setItem('token', token);
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    clearError
} = authSlice.actions;

export default authSlice.reducer;
