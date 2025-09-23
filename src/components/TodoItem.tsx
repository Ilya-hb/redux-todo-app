import { Trash, Check, Pencil, ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import type { TodoState } from "../types/types";

interface TodoItemProps {
  todo: TodoState;
  key: string;
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
  key,
  deleteTodo,
  completeTodo,
  editTodo,
}: TodoItemProps) {
  const [editState, setEditState] = useState<EditState>({
    id: null,
    isModalOpen: false,
  });
  const [updatedText, setUpdatedText] = useState("");

  return (
    <li
      className={`
           px-5 py-2 flex items-center flex-col w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
      key={key}
      onClick={() => {
        completeTodo(todo.id);
      }}
    >
      <div className="flex items center justify-between w-full">
        {editState.id === todo.id && editState.isModalOpen ? (
          <input
            placeholder="Edit Todo"
            className="focus:outline-none"
            value={updatedText}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && updatedText.trim()) {
                editTodo(todo.id, updatedText.trim());
                setEditState({ id: null, isModalOpen: false });
                setUpdatedText("");
              }
            }}
            onChange={(e) => {
              e.stopPropagation();
              setUpdatedText(e.target.value);
            }}
          />
        ) : (
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
        )}
        <div className="flex gap-2">
          {editState.id === todo.id && editState.isModalOpen ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (updatedText.trim().length > 0) {
                    editTodo(todo.id, updatedText.trim());
                    setEditState({
                      id: null,
                      isModalOpen: false,
                    });
                  }
                  setUpdatedText("");
                }}
                className="iconButton"
              >
                <Check
                  size={24}
                  className="transition hover:text-green-400"
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditState({ id: null, isModalOpen: false });
                }}
                className="iconButton"
              >
                <ArrowLeftToLine
                  size={24}
                  className="transition hover:text-orange-400"
                />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditState({ isModalOpen: true, id: todo.id });
                  setUpdatedText(todo.text);
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
          )}
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
