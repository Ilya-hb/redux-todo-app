import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./store/todoSlice";
function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  return (
    <div className="flex flex-col justify-center items-center container py-5 mx-auto gap-5">
      <h1 className="text-4xl font-bold ">Set your Tasks</h1>
      <div className="flex flex-col gap-5">
        <Form handleAddTodo={handleAddTodo} />
        {todos.length ? (
          <TodoList
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <p className="text-center text-neutral-500">Nothing to display...</p>
        )}
      </div>
    </div>
  );
}

export default App;
