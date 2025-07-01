import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { BookmarkCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, completeTodo } from "./store/todoSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };

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
        <Form handleAddTodo={handleAddTodo} />
        {todos.length ? (
          <TodoList
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
          />
        ) : (
          <p className="text-center text-neutral-500">Nothing to display...</p>
        )}
      </div>
    </div>
  );
}

export default App;
