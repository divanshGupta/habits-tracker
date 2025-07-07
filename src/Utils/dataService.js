import debounce from 'lodash.debounce';

const HABITS_KEY = 'habit_data_v1';

// Get habits from localStorage
export function getHabits() {
  const raw = localStorage.getItem(HABITS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Immediate save
function _saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

// Debounced save function (delay: 500ms)
export const saveHabits = debounce(_saveHabits, 500);

// Add new habit
export function addHabit(habit) {
  const habits = getHabits();
  habits.push(habit);
  saveHabits(habits);
  return habits;
}

// Delete habit by ID
export function deleteHabit(id) {
  const habits = getHabits().filter(h => h.id !== id);
  saveHabits(habits);
  return habits;
}

// Update habit by ID
export function updateHabit(updatedHabit) {
  const habits = getHabits().map(habit =>
    habit.id === updatedHabit.id ? updatedHabit : habit
  );
  saveHabits(habits);
  return habits;
}