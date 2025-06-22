import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
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
