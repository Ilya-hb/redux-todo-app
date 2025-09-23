export interface TodoState {
  completed: boolean;
  createdAt: string;
  id: string;
  text: string;
}

export interface LocalStorageTodos {
  error: null | string;
  loading: boolean;
  todos: TodoState[];
}

export interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: false;
}
