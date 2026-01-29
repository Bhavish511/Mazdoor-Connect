import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workers: [],
    featuredWorkers: [],
    selectedWorker: null,
    filters: {},
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        fetchWorkersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchWorkersSuccess: (state, action) => {
            state.isLoading = false;
            state.workers = action.payload.workers;
            state.totalCount = action.payload.total;
        },
        fetchWorkersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setFeaturedWorkers: (state, action) => {
            state.featuredWorkers = action.payload;
        },
        setSelectedWorker: (state, action) => {
            state.selectedWorker = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
            state.currentPage = 1;
        },
        updateFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.currentPage = 1;
        },
        clearFilters: (state) => {
            state.filters = {};
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    fetchWorkersStart,
    fetchWorkersSuccess,
    fetchWorkersFailure,
    setFeaturedWorkers,
    setSelectedWorker,
    setFilters,
    updateFilter,
    clearFilters,
    setCurrentPage,
} = workersSlice.actions;

export default workersSlice.reducer;
