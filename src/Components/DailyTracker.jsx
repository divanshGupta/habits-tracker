import { useState, useEffect } from "react";
import { defaultHabits } from "../App/defaultHabits";
import Habits from "./Habits";

export default function DailyTracker() {
  const today = new Date().toISOString().split("T")[0];
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(today);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(today, JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {defaultHabits.map((habit) => (
      <Habits
        key={habit.id}
        label={habit.label}
        checked={!!checked[habit.key]}
        onChange={() => toggleCheck(habit.key)}
        onDelete={() => handleDeleteHabit(habit.key)}
      />
    ))}

    </div>
  );
}