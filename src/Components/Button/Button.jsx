import { useDispatch, useSelector } from 'react-redux';
import { closeAddModal } from "../../Features/uiSlice";
import { addHabit } from "../../Features/habitsSlice"

export default function Button({ onClick, content, className }) {
  return (
    <button 
        onClick={onClick}
        className={`${className}`}
    >
        {content}
    </button>
  )
}
