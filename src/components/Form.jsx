import React, { useState } from "react";

export default function Form({ handleAddTask }) {
  const [inputVal, setInputVal] = useState("");
  const handleClick = () => {
    if (!inputVal.trim()) return;
    handleAddTask(inputVal);
    setInputVal("");
  };

  return (
    <div className="flex flex-row gap-5">
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
        Создать задачу
      </button>
    </div>
  );
}
