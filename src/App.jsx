import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { BookmarkCheck } from "lucide-react";
import { useSelector } from "react-redux";

function App() {
  const todos = useSelector((state) => state.todos);

  return (
    <div className="flex flex-col justify-center items-center container py-5 mx-auto gap-5">
      <div className="flex items-center gap-5">
        <h1 className="text-4xl font-bold ">Set your Tasks</h1>
        <BookmarkCheck
          size={48}
          className="text-yellow-300"
        />
      </div>

      <div className="flex flex-col gap-5 items-center">
        <Form />
        {todos.length ? (
          <TodoList todos={todos} />
        ) : (
          <p className="text-center text-neutral-500">Nothing to display...</p>
        )}
      </div>
    </div>
  );
}

export default App;
