import { Trash, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function TodoList({
  todos,
  handleDeleteTodo,
  handleCompleteTodo,
}) {
  return (
    <ul className="flex flex-col justify-center bg-black items-center shadow-black shadow-2xl rounded-xl">
      {todos.map((el, _) => (
        <li
          className={`
           px-5 py-2 flex items-center justify-between w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
          key={el.id}
          onClick={() => handleCompleteTodo(el.id)}
        >
          <span
            className={`${
              el.completed ? "text-green-400 " : ""
            } flex items-center gap-2 text-xl max-w-[350px] text-nowrap`}
          >
            <Check
              size={24}
              className={`${!el.completed && "opacity-0"} transition`}
            />
            {el.text.length > 25 ? el.text.slice(0, 25) + "..." : el.text}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTodo(el.id);
            }}
            className="text-xl cursor-pointer hover:bg-black p-1 transition hover:scale-110 rounded-full"
          >
            <Trash
              size={24}
              className="text-white hover:text-red-400 transition"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
