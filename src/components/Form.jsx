import { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodo, deleteCompletedTodo } from "../store/todoSlice";

export default function Form() {
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = (newTodo) => {
    if (!inputVal.trim()) return;
    setInputVal("");
    dispatch(addTodo(newTodo));
  };

  const handleDeleteCompletedTodo = () => {
    dispatch(deleteCompletedTodo());
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center">
      <input
        type="text"
        value={inputVal}
        placeholder="Write smh..."
        onChange={(e) => setInputVal(e.target.value)}
        className="px-5 py-2 border-b-[1px] border-neutral-600 focus:outline-none"
      ></input>

      <div className="flex  gap-5 items-center">
        <button
          onClick={() =>
            handleAddTodo({
              id: nanoid(),
              text: inputVal,
              completed: false,
              createdAt: new Date(Date.now()).toLocaleDateString("uk-UA"),
            })
          }
          className="px-5 py-2 bg-black border-neutral-700 border-1 rounded-xl hover:bg-neutral-600 transition cursor-pointer"
        >
          Create
        </button>
        <button
          onClick={() => handleDeleteCompletedTodo()}
          className="px-5 py-2 bg-black border-neutral-700 border-1 rounded-xl hover:bg-neutral-600 transition cursor-pointer"
        >
          Delete completed
        </button>
      </div>
    </div>
  );
}
