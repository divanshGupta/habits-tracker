import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../Features/uiSlice";

export default function DateNavigator() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.ui.selectedDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize

  const [year, month, day] = selectedDate.split("-").map(Number);
  const selected = new Date(year, month - 1, day);
  selected.setHours(0, 0, 0, 0);

  const nextDate = new Date(selected);
  nextDate.setDate(nextDate.getDate() + 1);

  const isNextDateInFuture = nextDate > today;

  const goPrevious = () => {
    const prev = new Date(selected);
    prev.setDate(prev.getDate() - 1);
    dispatch(setSelectedDate(prev.toLocaleDateString("en-CA")));
  };

  const goNext = () => {
    if (!isNextDateInFuture) {
      const next = new Date(selected);
      next.setDate(next.getDate() + 1);
      dispatch(setSelectedDate(next.toLocaleDateString("en-CA")));
    }
  };

//   const goToday = () => {
//     dispatch(setSelectedDate(today.toLocaleDateString("en-CA")));
//   };

  return (
    <div className="flex items-center gap-2">
      <button onClick={goPrevious} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        ←
      </button>

      <div className="font-semibold text-lg">{selectedDate}</div>

      <button
        onClick={goNext}
        disabled={isNextDateInFuture}
        className={`px-3 py-1 rounded ${
          isNextDateInFuture
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        →
      </button>

    </div>
  );
}
