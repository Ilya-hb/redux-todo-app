import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import filterReducer from "./filterSlice";

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
    filter: filterReducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));
