import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: 'en',
    isSidebarOpen: true,
    isMobileMenuOpen: false,
    notifications: [],
    unreadNotifications: 0,
    isFilterModalOpen: false,
    toast: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setMobileMenuOpen: (state, action) => {
            state.isMobileMenuOpen = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.read) {
                state.unreadNotifications += 1;
            }
        },
        markNotificationRead: (state, action) => {
            const notification = state.notifications.find((n) => n.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadNotifications -= 1;
            }
        },
        markAllNotificationsRead: (state) => {
            state.notifications.forEach((n) => (n.read = true));
            state.unreadNotifications = 0;
        },
        setFilterModalOpen: (state, action) => {
            state.isFilterModalOpen = action.payload;
        },
        showToast: (state, action) => {
            state.toast = { show: true, ...action.payload };
        },
        hideToast: (state) => {
            state.toast = null;
        },
    },
});

export const {
    setLanguage,
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    setFilterModalOpen,
    showToast,
    hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
