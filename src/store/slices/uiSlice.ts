import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language, Notification } from '@/types';

interface UIState {
  language: Language;
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  notifications: Notification[];
  unreadNotifications: number;
  isFilterModalOpen: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
}

const initialState: UIState = {
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
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadNotifications += 1;
      }
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
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
    setFilterModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterModalOpen = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
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
