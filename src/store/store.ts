import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todoSlice";
import filterReducer from "./filterSlice";

const saveToLocalStorage = (state: RootState) => {
  try {
    const serialized = JSON.stringify(state.todos);
    console.log("serialized:", state.todos);
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

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
