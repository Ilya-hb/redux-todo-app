import { Trash, Check, Pencil, ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import type { TodoState } from "../types/types";
import TodoActions from "./TodoActions";

export interface TodoItemProps {
  todo: TodoState;
  deleteTodo(id: string): void;
  completeTodo(id: string): void;
  editTodo(id: string, text: string): void;
}

interface EditState {
  id: null | string;
  isModalOpen: boolean;
}

export default function TodoItem({
  todo,
  deleteTodo,
  completeTodo,
  editTodo,
}: TodoItemProps) {
  return (
    <li
      className={`
           px-5 py-2 flex items-center flex-col w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
      onClick={() => {
        completeTodo(todo.id);
      }}
    >
      <div className="flex items center justify-between w-full">
        <span
          className={`${
            todo.completed ? "text-green-400 " : ""
          } flex items-center gap-2 text-xl max-w-[370px] text-nowrap `}
        >
          <Check
            size={24}
            className={`${!todo.completed && "opacity-0"} transition`}
          />
          {todo.text.length > 25 ? todo.text.slice(0, 25) + "..." : todo.text}
        </span>

        <div className="flex gap-2">
          <TodoActions
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <span className="text-xs font-semibold text-neutral-600">
          {todo.createdAt}
        </span>
        <div className="flex gap-2">
          <div className="w-[10px] h-[10px] bg-amber-300 rounded-full"></div>
          <div className="w-[10px] h-[10px] bg-red-300 rounded-full"></div>
          <div className="w-[10px] h-[10px] bg-blue-300 rounded-full"></div>
        </div>
      </div>
    </li>
  );
}
