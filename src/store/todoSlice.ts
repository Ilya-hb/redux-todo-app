import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { ApiTodo, LocalStorageTodos, TodoState } from "../types/types";

const getLocalStorageData = () => {
  try {
    const todos = localStorage.getItem("todos");
    // console.log(todos);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    if (error instanceof Error)
      console.log("LocalStorage Error: ", error.message);
    else console.log("LocalStorage unknown error:", error);
    return [];
  }
};

export const fetchFakeTodos = createAsyncThunk<
  ApiTodo[],
  void,
  { rejectValue: string }
>("todos/fetchFakeTodos", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) throw new Error("Server error!");
    return (await res.json()) as ApiTodo[];
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    else return rejectWithValue(`Fetch todos - unknown error: ${error}`);
  }
});

const initialState: LocalStorageTodos | [] = {
  todos: getLocalStorageData(),
  loading: false,
  error: null,
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoState>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<TodoState["id"]>) {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    completeTodo(state, action: PayloadAction<TodoState["id"]>) {
      const todoToComplete = state.todos.find((el) => el.id === action.payload);
      if (todoToComplete) todoToComplete.completed = !todoToComplete.completed;
    },

    editTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const todoToEdit = state.todos.find((el) => el.id === action.payload.id);
      if (todoToEdit) todoToEdit.text = action.payload.text;
    },
    deleteCompletedTodo(state) {
      const completedTodos = state.todos.filter((el) => el.completed === true);
      state.todos = [...state.todos, ...completedTodos];
      // return {
      //   ...state.todos,
      //   todos: state.todos.filter((el) => !el.completed),
      // };
    },
    deleteAllTodos(state) {
      state.todos = [];
    },
  },

  // async
  extraReducers: (builder) => {
    builder.addCase(fetchFakeTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchFakeTodos.fulfilled,
      (state, action: PayloadAction<ApiTodo[]>) => {
        const validData: TodoState[] = action.payload.slice(0, 5).map((el) => {
          return {
            id: nanoid(),
            text: el.title,
            completed: false,
            createdAt: new Date(Date.now()).toLocaleDateString("uk-UA"),
          };
        });
        state.todos = [...state.todos, ...validData];
        state.loading = false;
      }
    );
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
export const todosReducer = todosSlice.reducer;
