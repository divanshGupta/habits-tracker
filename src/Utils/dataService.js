import debounce from 'lodash.debounce';

const HABITS_KEY = 'habit_data_v1';

/**
 * Get all habits from localStorage
 * Used only on app load to hydrate initial state
 */
export function getHabits() {
  const data = localStorage.getItem(HABITS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save habits to localStorage immediately
 * (used internally by debounced and manual saves)
 */
function _saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

/**
 * Debounced save to localStorage
 * Helps reduce rapid writes when toggling checkboxes, etc.
 */
export const saveHabits = debounce(_saveHabits, 500);

/**
 * Add a habit to current list
 * Returns new habit object (you must add to state manually)
 */
export function createHabit(habit) {
  const newHabit = {
    id: crypto.randomUUID(),
    title: habit.title || "Untitled Habit",
    records: {}, // start with empty records
    ...habit,    // spread any additional props (e.g., color, type)
  };
  return newHabit;
}

/**
 * Save all habits to localStorage manually (sync version)
 * Use this after setHabits to persist updated array
 */
export function persistHabits(habits) {
  _saveHabits(habits);
}