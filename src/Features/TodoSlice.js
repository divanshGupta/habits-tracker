import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: 1,
        heading: "this is heading",
        text: "this is the body of the notes",
        dateCreated: "",
    }]
}

let currentDate = new Date();

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                heading: action.payload.heading,
                text: action.payload.input,
                dateCreated: currentDate.toLocaleDateString(),
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload );
        },

        editTodo: (state, action) => {
            state.todos.forEach((todo, index) => {
                if(todo.id === action.payload.id) {
                    todo.heading = action.payload.heading;
                }})
        },
    }
})

export const { addTodo, removeTodo, editTodo } = todoSlice.actions

export default todoSlice.reducer