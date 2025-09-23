import { deleteTodo, completeTodo, editTodo } from "../store/todoSlice";
import { getFilteredTodos } from "../utils/todoUtils";
import { useAppDispatch, useAppSelector } from "../utils/redux-hooks";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const filteredTodos = getFilteredTodos(todos, filter);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(completeTodo(id));
  };

  const handleEditTodo = (id: string, text: string) => {
    dispatch(editTodo({ id, text }));
  };

  return (
    <ul className="flex flex-col justify-center w-full bg-black items-center shadow-black shadow-2xl rounded-xl">
      {filteredTodos.map((el, _) => (
        // <li
        //   className={`
        //    px-5 py-2 flex items-center flex-col w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
        //   key={el.id}
        //   onClick={() => {
        //     handleCompleteTodo(el.id);
        //   }}
        // >
        //   <div className="flex items center justify-between w-full">
        //     {editState.id === el.id && editState.isModalOpen ? (
        //       <input
        //         placeholder="Edit Todo"
        //         className="focus:outline-none"
        //         value={updatedText}
        //         autoFocus
        //         onKeyDown={(e) => {
        //           if (e.key === "Enter" && updatedText.trim()) {
        //             handleEditTodo(el.id, updatedText.trim());
        //             setEditState({ id: null, isModalOpen: false });
        //             setUpdatedText("");
        //           }
        //         }}
        //         onChange={(e) => {
        //           e.stopPropagation();
        //           setUpdatedText(e.target.value);
        //         }}
        //       ></input>
        //     ) : (
        //       <span
        //         className={`${
        //           el.completed ? "text-green-400 " : ""
        //         } flex items-center gap-2 text-xl max-w-[370px] text-nowrap `}
        //       >
        //         <Check
        //           size={24}
        //           className={`${!el.completed && "opacity-0"} transition`}
        //         />
        //         {el.text.length > 25 ? el.text.slice(0, 25) + "..." : el.text}
        //       </span>
        //     )}
        //     <div className="flex gap-2">
        //       {editState.id === el.id && editState.isModalOpen ? (
        //         <>
        //           <button
        //             onClick={(e) => {
        //               e.stopPropagation();
        //               if (updatedText.trim().length > 0) {
        //                 handleEditTodo(el.id, updatedText.trim());
        //                 setEditState({
        //                   id: null,
        //                   isModalOpen: false,
        //                 });
        //               }
        //               setUpdatedText("");
        //             }}
        //             className="iconButton"
        //           >
        //             <Check
        //               size={24}
        //               className="transition hover:text-green-400"
        //             />
        //           </button>
        //           <button
        //             onClick={(e) => {
        //               e.stopPropagation();
        //               setEditState({ id: null, isModalOpen: false });
        //             }}
        //             className="iconButton"
        //           >
        //             <ArrowLeftToLine
        //               size={24}
        //               className="transition hover:text-orange-400"
        //             />
        //           </button>
        //         </>
        //       ) : (
        //         <>
        //           <button
        //             onClick={(e) => {
        //               e.stopPropagation();
        //               setEditState({ isModalOpen: true, id: el.id });
        //               setUpdatedText(el.text);
        //             }}
        //             className="iconButton"
        //           >
        //             <Pencil
        //               size={24}
        //               className="text-white hover:text-blue-400 transition"
        //             />
        //           </button>
        //           <button
        //             onClick={(e) => {
        //               e.stopPropagation();
        //               handleDeleteTodo(el.id);
        //             }}
        //             className="iconButton"
        //           >
        //             <Trash
        //               size={24}
        //               className="text-white hover:text-red-400 transition"
        //             />
        //           </button>
        //         </>
        //       )}
        //     </div>
        //   </div>
        //   <div className="flex justify-between w-full items-center">
        //     <span className="text-xs font-semibold text-neutral-600">
        //       {el.createdAt}
        //     </span>
        //     <div className="flex gap-2">
        //       <div className="w-[10px] h-[10px] bg-amber-300 rounded-full"></div>
        //       <div className="w-[10px] h-[10px] bg-red-300 rounded-full"></div>
        //       <div className="w-[10px] h-[10px] bg-blue-300 rounded-full"></div>
        //     </div>
        //   </div>
        // </li>
        <TodoItem
          todo={el}
          key={el.id}
          deleteTodo={handleDeleteTodo}
          completeTodo={handleCompleteTodo}
          editTodo={handleEditTodo}
        />
      ))}
    </ul>
  );
}
