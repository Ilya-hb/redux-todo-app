import React from "react";

export default function TodoList({ todos, handleDeleteTodo }) {
  return (
    <ul className="flex flex-col justify-center items-center">
      {todos.map((el, index) => (
        <li
          className="px-5 py-2 flex justify-between bg-black border-neutral-700 w-full hover:bg-neutral-900 cursor-pointer transition"
          key={index}
        >
          <p className="text-xl">{el}</p>
          <button
            onClick={() => handleDeleteTodo(index)}
            className="text-xl cursor-pointer"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
