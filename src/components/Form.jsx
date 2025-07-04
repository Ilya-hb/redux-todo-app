import { useState } from "react";
import { nanoid } from "nanoid";
import { CopyX, ClipboardPlus } from "lucide-react";
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
        name="todoInput"
        placeholder="Write smh..."
        onChange={(e) => setInputVal(e.target.value)}
        className="px-5 py-2 focus:outline-none bg-neutral-900 rounded-xl drop-shadow-xl"
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
          className="defaultButton"
        >
          Create
          <ClipboardPlus size={20} />
        </button>
        <button
          onClick={() => handleDeleteCompletedTodo()}
          className="defaultButton"
        >
          Delete completed
          <CopyX size={20} />
        </button>
      </div>
    </div>
  );
}
