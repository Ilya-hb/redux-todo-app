import { FILTERS } from "./enums";

export const getFilteredTodos = ({ todos }, filter) => {
  switch (filter) {
    case FILTERS.ACTIVE:
      return todos.filter((todo) => todo.completed !== true);
    case FILTERS.COMPLETED:
      return todos.filter((todo) => todo.completed === true);
    default:
      return todos;
  }
};
