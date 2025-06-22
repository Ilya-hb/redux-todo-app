import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.todos);
    localStorage.setItem("todos", serialized);
  } catch (error) {
    console.log(error.message);
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Subscribe for any changes from store
store.subscribe(() => saveToLocalStorage(store.getState()));
