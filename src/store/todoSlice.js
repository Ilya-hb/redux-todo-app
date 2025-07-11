import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const getLocalStorageData = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.log("Error: ", error.message);
    return [];
  }
};

export const fetchFakeTodos = createAsyncThunk(
  "todos/fetchFakeTodos",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    return await res.json();
  }
);

const initialState = {
  todos: getLocalStorageData(),
  loading: false,
  error: null,
};
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action) {
      return state.todos.filter((el, _) => el.id !== action.payload);
    },
    completeTodo(state, action) {
      const todoToComplete = state.todos.find((el) => el.id === action.payload);
      todoToComplete.completed = !todoToComplete.completed;
    },

    editTodo(state, action) {
      const todoToEdit = state.todos.find((el) => el.id === action.payload.id);
      console.log(todoToEdit);
      todoToEdit.text = action.payload.text;
    },
    deleteCompletedTodo(state) {
      return state.todos.filter((el) => el.completed !== true);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFakeTodos.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFakeTodos.fulfilled, (state, action) => {
      console.log(action);
      const validData = action.payload.map((el) => {
        return {
          id: nanoid(),
          text: el.title,
          completed: false,
          createdAt: new Date(Date.now()).toLocaleDateString("uk-UA"),
        };
      });
      state.todos = [...validData];
      console.log(state.todos);
      state.loading = false;
    });
    builder.addCase(fetchFakeTodos.rejected, (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const {
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo,
  deleteCompletedTodo,
} = todosSlice.actions;
export default todosSlice.reducer;
