import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";

const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.todos);
    localStorage.setItem("todos", serialized);
  } catch (error) {
    console.log("Error while saving todos:", error.message);
  }
};

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));
