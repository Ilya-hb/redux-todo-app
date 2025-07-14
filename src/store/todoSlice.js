import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const getLocalStorageData = () => {
  try {
    const todos = localStorage.getItem("todos");
    // console.log(todos);
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
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    completeTodo(state, action) {
      const todoToComplete = state.todos.find((el) => el.id === action.payload);
      todoToComplete.completed = !todoToComplete.completed;
    },

    editTodo(state, action) {
      const todoToEdit = state.todos.find((el) => el.id === action.payload.id);
      todoToEdit.text = action.payload.text;
    },
    deleteCompletedTodo(state) {
      return {
        ...state.todos,
        todos: state.todos.filter((el) => !el.completed),
      };
    },
    deleteAllTodos(state) {
      state.todos = [];
    },
  },

  // async
  extraReducers: (builder) => {
    builder.addCase(fetchFakeTodos.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFakeTodos.fulfilled, (state, action) => {
      // console.log(action);
      const validData = action.payload.slice(0, 5).map((el) => {
        return {
          id: nanoid(),
          text: el.title,
          completed: false,
          createdAt: new Date(Date.now()).toLocaleDateString("uk-UA"),
        };
      });
      state.todos = [...state.todos, ...validData];
      state.loading = false;
    });
    builder.addCase(fetchFakeTodos.rejected, (state, action) => {
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
  deleteAllTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
