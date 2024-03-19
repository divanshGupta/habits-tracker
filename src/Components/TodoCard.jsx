import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, editTodo } from '../Features/TodoSlice'

function TodoCard() {
    const todos = useSelector(state => state.todos)
    const [heading, setHeading] = useState(todos.heading)
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [input, setInput] = useState(todos.input)
    const dispatch = useDispatch()

    // const editTodoHandler = (e) => {
    //     e.preventDefault()
    //     dispatch(editTodo({id, heading, input}))
    // }

    

  return (
    <>
    
    {/* todo body */}
    {todos.map((todo) => (
    <div key={todo.id} className='relative h-60 w-48 bg-zinc-800 rounded-[20px] text-white p-5 overflow-hidden'>
            <input 
            className='text-lg text-orange-500 bg-transparent border-b-2 w-full'
            value={isTodoEditable ? heading : todo.heading}
            type="text"
            onChange={(e)=>setHeading(e.target.value)}
            readOnly={!isTodoEditable}
            />
            <div className='text-white text-sm'>{todo.text}</div>
            

    {/* footer menu */}
    <div className='absolute bottom-0 left-0 bg-gray-500 w-full h-8 flex items-center justify-between p-5 gap-2 text-black'>
        <button
            onClick={() => {
                

                if (isTodoEditable) {
                    dispatch(editTodo({id:todo.id, heading:heading}));
                    setIsTodoEditable(false)

                } else setIsTodoEditable((prev) => !prev);
            }}

            // disabled={todo.editable}
            >{isTodoEditable ? "📁" : "✏️"}</button>

        <div className='text-black text-xs'>{todo.dateCreated}</div>

        
             
            {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8  text-sms justify-between items-center"
              onClick={() => dispatch(removeTodo(todo.id))}
          >
              ❌
          </button>
    
    </div>
    
    </div>
    ))}

    </>
  )
}

export default TodoCard
