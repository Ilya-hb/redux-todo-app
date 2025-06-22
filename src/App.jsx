import { useEffect, useState } from "react";
import Form from "./components/Form";
function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((_, i) => i !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center container py-5 mx-auto gap-5">
      <h1 className="text-4xl font-bold ">Set your Tasks</h1>
      <div className="flex flex-col gap-5">
        <Form handleAddTask={handleAddTask} />
        <ul className="flex flex-col justify-center items-center">
          {tasks.map((el, index) => (
            <li
              className="px-5 py-2 flex justify-between bg-black border-neutral-700 w-full hover:bg-neutral-900 cursor-pointer transition"
              key={index}
            >
              <p className="text-xl">{el}</p>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-xl cursor-pointer"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
