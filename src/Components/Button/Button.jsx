export default function Button({ OnAddClick }) {
  return (
    <button 
        className="text-3xl"
        onClick={()=> OnAddClick(true)}
    >
        +
    </button>
  )
}
