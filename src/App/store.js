import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from '../Features/habitsSlice';
import uiReducer from '../Features/uiSlice';

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    ui: uiReducer,
  },
});
