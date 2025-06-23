export default function TodoList({
  todos,
  handleDeleteTodo,
  handleCompleteTodo,
}) {
  return (
    <ul className="flex flex-col justify-center bg-black items-center shadow-black shadow-2xl rounded-xl">
      {todos.map((el, _) => (
        <li
          className={`${
            el.completed === true ? "text-green-400" : ""
          } px-5 py-2 flex justify-between w-full rounded-xl hover:bg-neutral-900 cursor-pointer transition`}
          key={el.id}
          onClick={() => handleCompleteTodo(el.id)}
        >
          <p className="text-xl">{el.text}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTodo(el.id);
            }}
            className="text-xl cursor-pointer hover:bg-black p-1 transition hover:scale-110 rounded-full"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
