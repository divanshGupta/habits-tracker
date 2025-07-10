import { createSlice } from "@reduxjs/toolkit";
import { saveHabits, toPlainHabits } from "../Utils/dataService";

const initialState = [];

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },

    addHabit: (state, action) => {
      state.push(action.payload);
    },

    deleteHabit: (state, action) => {
      const index = state.findIndex(h => h.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    editHabit: (state, action) => {
      const { id, title, frequency, type } = action.payload;
      const habit = state.find(h => h.id === id);
      if (habit) {
        habit.title = title;
        habit.frequency = frequency;
        habit.type = type;
      }
    },

    markHabitDone: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.find(h => h.id === id);
      if (habit) {
        if (!habit.records) habit.records = {};
        habit.records[date] = "done";
      }
    },

    markHabitSkipped: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.find(h => h.id === id);
      if (habit) {
        if (!habit.records) habit.records = {};
        habit.records[date] = "skipped";
        
      }
    },
  },
});

export const {
  setHabits,
  addHabit,
  deleteHabit,
  editHabit,
  markHabitDone,
  markHabitSkipped,
} = habitsSlice.actions;

export default habitsSlice.reducer;
