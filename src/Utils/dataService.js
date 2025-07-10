import debounce from "lodash.debounce";

const HABITS_KEY = "habit_data_v1";

/** Convert proxy state to plain JS */
export function toPlainHabits(habits) {
  try {
    return JSON.parse(JSON.stringify(habits));
  } catch (e) {
    console.error("Failed to convert habits to plain JS:", e);
    return [];
  }
}

/** Get habits from localStorage */
export function getHabits() {
  const data = localStorage.getItem(HABITS_KEY);
  return data ? JSON.parse(data) : [];
}

/** Save habits to localStorage */
export function _saveHabits(habits) {
  try {
    const plainHabits = toPlainHabits(habits);
    localStorage.setItem(HABITS_KEY, JSON.stringify(plainHabits));
  } catch (e) {
    console.error("Failed to save habits:", e);
  }
}

export const saveHabits = debounce(_saveHabits, 500);

export function createHabit(habit) {
  const newHabit = {
    id: crypto.randomUUID(),
    title: habit.title || "Untitled Habit",
    records: {},
    ...habit,
  };
  return newHabit;
}

export function persistHabits(habits) {
  _saveHabits(habits);
}

export const dataService = {
  getHabits,
  saveHabits,
  createHabit,
  persistHabits,
  toPlainHabits,
};
