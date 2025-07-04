import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageData = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.log("Error: ", error.message);
    return [];
  }
};

const todosSlice = createSlice({
  name: "todos",
  initialState: getLocalStorageData(),
  reducers: {
    addTodo(state, action) {
      state.push(action.payload);
    },
    deleteTodo(state, action) {
      return state.filter((el, _) => el.id !== action.payload);
    },
    completeTodo(state, action) {
      const todoToComplete = state.find((el) => el.id === action.payload);
      todoToComplete.completed = !todoToComplete.completed;
    },

    editTodo(state, action) {
      const todoToEdit = state.find((el) => el.id === action.payload.id);
      console.log(todoToEdit);
      todoToEdit.text = action.payload.text;
    },
  },
});

export const { addTodo, deleteTodo, completeTodo, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
