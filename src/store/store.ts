import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todoSlice";
import filterReducer from "./filterSlice";
import type { TodoState } from "../types/types";

const saveToLocalStorage = (todos: TodoState[]) => {
  try {
    const serialized = JSON.stringify(todos);
    console.log("serialized:", todos);
    localStorage.setItem("todos", serialized);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while saving todos:", error.message);
    } else console.log("Unknown error:", error);
  }
};

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState().todos.todos));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
