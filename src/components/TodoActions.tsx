import { useState } from "react";
import type { TodoItemProps } from "./TodoItem";
import EditTodoForm from "./EditTodoForm";
import { Pencil, Trash } from "lucide-react";

interface TodoActionsProps extends Omit<TodoItemProps, "completeTodo"> {}
export default function TodoActions({
  todo,
  editTodo,
  deleteTodo,
}: TodoActionsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing)
    return (
      <EditTodoForm
        todo={todo}
        onSave={(text: string) => {
          editTodo(todo.id, text);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="iconButton"
      >
        <Pencil
          size={24}
          className="text-white hover:text-blue-400 transition"
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
        className="iconButton"
      >
        <Trash
          size={24}
          className="text-white hover:text-red-400 transition"
        />
      </button>
    </>
  );
}
