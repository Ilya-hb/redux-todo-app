import { Trash, Check, Pencil, ArrowLeftToLine } from "lucide-react";
import { useState } from "react";

export default function TodoList({
  todos,
  handleDeleteTodo,
  handleCompleteTodo,
  handleEditTodo,
}) {
  const [editState, setEditState] = useState({
    id: null,
    isModalOpen: false,
  });
  const [updatedText, setUpdatedText] = useState("");

  return (
    <ul className="flex flex-col justify-center w-full bg-black items-center shadow-black shadow-2xl rounded-xl">
      {todos.map((el, _) => (
        <li
          className={`
           px-5 py-2 flex items-center justify-between w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
          key={el.id}
          onClick={() => {
            handleCompleteTodo(el.id);
          }}
        >
          {editState.id === el.id && editState.isModalOpen ? (
            <input
              placeholder="Edit Todo"
              className="focus:outline-none"
              onChange={(e) => {
                e.stopPropagation();
                setUpdatedText(e.target.value);
              }}
            ></input>
          ) : (
            <span
              className={`${
                el.completed ? "text-green-400 " : ""
              } flex items-center gap-2 text-xl max-w-[370px] text-nowrap `}
            >
              <Check
                size={24}
                className={`${!el.completed && "opacity-0"} transition`}
              />
              {el.text.length > 25 ? el.text.slice(0, 25) + "..." : el.text}
            </span>
          )}

          <div className="flex gap-2">
            {editState.id === el.id && editState.isModalOpen ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (updatedText) {
                      handleEditTodo(el.id, updatedText);
                      setEditState({
                        id: null,
                        isModalOpen: false,
                      });
                      setUpdatedText("");
                    }
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
                    setEditState({ isModalOpen: true, id: el.id });
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
                    handleDeleteTodo(el.id);
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
        </li>
      ))}
    </ul>
  );
}
