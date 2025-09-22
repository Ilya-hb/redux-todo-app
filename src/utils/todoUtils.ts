import { Filters } from "../types/enums";
import type { LocalStorageTodos, TodoState } from "../types/types";

export const getFilteredTodos = (
  { todos }: LocalStorageTodos,
  filter: Filters
) => {
  console.log(todos);
  switch (filter) {
    case Filters.ACTIVE:
      return todos.filter((todo) => todo.completed !== true);
    case Filters.COMPLETED:
      return todos.filter((todo) => todo.completed === true);
    default:
      return todos;
  }
};
