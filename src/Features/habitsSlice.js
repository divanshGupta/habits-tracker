import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ title, frequency, type }) => ({
        payload: {
          id: nanoid(),
          title,
          frequency,
          type, // 'todo' or 'notodo'
          history: {},
        },
      }),
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
    deleteHabit: (state, action) => {
      return state.filter(habit => habit.id !== action.payload);
    },
    markHabitDone: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.find(h => h.id === id);
      if (habit) {
        habit.history[date] = 'done';
      }
    },
    markHabitSkipped: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.find(h => h.id === id);
      if (habit) {
        habit.history[date] = 'skipped';
      }
    },
  },
});

export const {
  addHabit,
  editHabit,
  deleteHabit,
  markHabitDone,
  markHabitSkipped,
} = habitsSlice.actions;

export default habitsSlice.reducer;
