import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddHabitModalOpen: false,
  editHabitId: null,
  isEditHabitModalOpen: null,
  isDeleteModalOpen: null,
  habitIdToDelete: null,
  selectedHabit: null,
  selectedDate: new Date().toLocaleDateString('en-CA'), // e.g., "2025-07-11"
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
    },
    openEditModal: (state, action) => {
      state.isEditHabitModalOpen = true;
      state.editHabitId = action.payload;
    },
    closeEditModal: (state, action) => {
      state.isEditHabitModalOpen = false;
      state.editHabitId = action.payload;
    },
    openDeleteModal: (state, action) => {
      state.isDeleteModalOpen = true;
      state.habitIdToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.habitIdToDelete = null;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedHabit: (state, action) => {
      state.selectedHabit = action.payload;
    }
  },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  setSelectedDate,
  setSelectedHabit,
  openDeleteModal,
  closeDeleteModal,
} = uiSlice.actions;

export default uiSlice.reducer;

