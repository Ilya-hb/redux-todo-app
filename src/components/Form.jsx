import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Form({ handleAddTodo }) {
  const [inputVal, setInputVal] = useState("");

  const handleClick = () => {
    if (!inputVal.trim()) return;
    handleAddTodo({
      id: nanoid(),
      text: inputVal,
      completed: false,
      createdAt: new Date(Date.now()).toLocaleDateString("uk-UA"),
    });
    setInputVal("");
  };

  return (
    <div className="flex flex-row gap-5 items-center">
      <input
        type="text"
        value={inputVal}
        placeholder="Write smh..."
        onChange={(e) => setInputVal(e.target.value)}
        className="px-5 py-2 border-b-[1px] border-neutral-600 focus:outline-none"
      ></input>
      <button
        onClick={handleClick}
        className="px-5 py-2 bg-black border-neutral-700 border-1 rounded-xl hover:bg-neutral-600 transition cursor-pointer"
      >
        Create
      </button>
    </div>
  );
}
