 import react, { useEffect, useState } from 'react'
 import { useDispatch } from 'react-redux' 
 import { addTodo } from '../Features/TodoSlice'

 function CreateNotes() {
     const [heading, setHeading] = useState("")
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo({heading, input}))
        setInput("")
        setHeading("")
    }

    

  return (
    <form onSubmit={addTodoHandler} className="space-x-3">

        

        <input
        type="text"
        className="w-96 h-12 bg-slate-500 rounded border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={heading}
        onChange={(e)=>setHeading(e.target.value)}
      />

        <input
        type="text"
        className="w-96 h-12 bg-slate-500 rounded border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

export default CreateNotes