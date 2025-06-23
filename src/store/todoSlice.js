import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageData = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const todoSlice = createSlice({
  name: "todos",
  initialState: getLocalStorageData(),
  reducers: {
    addTodo(state, action) {
      state.push(action.payload);
    },
    deleteTodo(state, action) {
      return state.filter((todo, _) => todo.id !== action.payload);
    },
    completeTodo(state, action) {
      const todo = state.find((el) => el.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
