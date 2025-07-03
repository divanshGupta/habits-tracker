export default function Button({ OnAddClick, content, className }) {
  return (
    <button 
        onClick={()=> OnAddClick(true)}
        className={`${className}`}
    >
        {content}
    </button>
  )
}
