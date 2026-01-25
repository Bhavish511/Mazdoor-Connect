import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Worker, WorkerFilters } from '@/types';

interface WorkersState {
  workers: Worker[];
  featuredWorkers: Worker[];
  selectedWorker: Worker | null;
  filters: WorkerFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
}

const initialState: WorkersState = {
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
    fetchWorkersSuccess: (state, action: PayloadAction<{ workers: Worker[]; total: number }>) => {
      state.isLoading = false;
      state.workers = action.payload.workers;
      state.totalCount = action.payload.total;
    },
    fetchWorkersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFeaturedWorkers: (state, action: PayloadAction<Worker[]>) => {
      state.featuredWorkers = action.payload;
    },
    setSelectedWorker: (state, action: PayloadAction<Worker | null>) => {
      state.selectedWorker = action.payload;
    },
    setFilters: (state, action: PayloadAction<WorkerFilters>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    updateFilter: (state, action: PayloadAction<Partial<WorkerFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
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
