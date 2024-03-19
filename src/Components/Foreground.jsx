import React, { useState} from 'react'
import TodoCard from './TodoCard'
import CreateNotes from './CreateNotes'

function Foreground() {

  return (
    <>
        <div className='top-0 left-0 w-full h-screen z-[3] bg-orange-100'>

            <div className='w-full py-10 text-zinc-900 font-semibold flex justify-center'>
                <CreateNotes />
            </div>

            <div className='w-full p-5 bg-transparent text-zinc-900 font-semibold gap-5 flex flex-wrap overflow-auto'>
                <TodoCard/>
            </div>
            
            
        </div>
    </>
  )
}

export default Foreground
