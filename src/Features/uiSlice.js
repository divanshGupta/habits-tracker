// src/features/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddHabitModalOpen: false,
  editHabitId: null,
  selectedDate: new Date().toISOString().split('T')[0], // e.g., "2025-07-09"
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isAddHabitModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddHabitModalOpen = false;
      state.editHabitId = null;
    },
    openEditModal: (state, action) => {
      state.isAddHabitModalOpen = true;
      state.editHabitId = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  setSelectedDate,
} = uiSlice.actions;

export default uiSlice.reducer;

