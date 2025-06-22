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
      console.log(state);
      console.log(action);
      state.push(action.payload);
    },
    deleteTodo(state, action) {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
