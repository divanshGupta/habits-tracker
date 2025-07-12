// hooks/useHabitStatus.js
import { useDispatch, useSelector } from "react-redux";
import { setHabitStatus } from "../Features/habitsSlice";

export function useHabitStatus(habitId, date) {
  const dispatch = useDispatch();

  const habit = useSelector(state =>
    state.habits.find(h => h.id === habitId)
  );

  const isDone = habit?.records?.[date] === "done";

  const toggleStatus = () => {
    dispatch(
      setHabitStatus({
        id: habitId,
        date,
        status: isDone ? null : "done",
      })
    );
  };

  return { isDone, toggleStatus };
}
