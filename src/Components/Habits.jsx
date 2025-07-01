export default function Habit({ label, checked, onChange }) {
  return (
    <div className="bg-yellow-50 flex items-center justify-start border-2 
    border-gray-500 rounded-lg p-4 mb-4 text-xl">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mr-2 w-5 h-5"
        />
        <label>{label}</label>
    </div>
  );
}