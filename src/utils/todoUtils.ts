import { Filters } from "../types/enums";
import type { TodoState } from "../types/types";

export const getFilteredTodos = (todos: TodoState[], filter: Filters) => {
  console.log("Todos in filter function: ", todos);
  switch (filter) {
    case Filters.ACTIVE:
      return todos.filter((todo) => todo.completed !== true);
    case Filters.COMPLETED:
      return todos.filter((todo) => todo.completed === true);
    default:
      return todos;
  }
};
