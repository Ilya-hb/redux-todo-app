import { deleteTodo, completeTodo, editTodo } from "../store/todoSlice";
import { getFilteredTodos } from "../utils/todoUtils";
import { useAppDispatch, useAppSelector } from "../utils/redux-hooks";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const filteredTodos = getFilteredTodos(todos, filter);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(completeTodo(id));
  };

  const handleEditTodo = (id: string, text: string) => {
    dispatch(editTodo({ id, text }));
  };

  return (
    <ul className="flex flex-col justify-center w-full bg-black items-center shadow-black shadow-2xl rounded-xl">
      {filteredTodos.map((el, _) => (
        <TodoItem
          todo={el}
          key={el.id}
          deleteTodo={handleDeleteTodo}
          completeTodo={handleCompleteTodo}
          editTodo={handleEditTodo}
        />
      ))}
    </ul>
  );
}
