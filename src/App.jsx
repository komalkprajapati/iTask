import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
uuidv4();

function App() {
  const [todo, setTodo] = useState("");
  const [task, setTask] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const inputfocus = useRef("");

  useEffect(() => {
    let todoString = localStorage.getItem("task");
    if (todoString) {
      let tasks = JSON.parse(localStorage.getItem("task"));
      setTask(tasks);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("task", JSON.stringify(task));
  };

  const toggleChange = () => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = task.findIndex((item) => {
      return item.id === id;
    });
    let newTasks = [...task];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTask(newTasks);
    saveToLs();
  };

  const handleAdd = () => {
    setTask([...task, { id: uuidv4(), todo: todo, isCompleted: false }]);

    setTodo("");
    inputfocus.current.focus();
    saveToLs();
  };

  const handleEdit = (id) => {
    let t = task.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let newTask = task.filter((item) => {
      return item.id !== id;
    });
    setTask(newTask);
    saveToLs();
  };

  const handleDelete = (id) => {
    let newTask = task.filter((item) => {
      return item.id !== id;
    });

    setTask(newTask);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-violet-100 p-5 mx-3 md:mx-auto my-5 rounded-xl min-h-[80vh] md:w-1/2 shadow-md">
        <div className="todos ">
          <h1 className="font-bold text-xl text-center mb-6">
            iTask - Manage Your task at one place
          </h1>
          <h2 className="text-lg font-bold my-2">Add Your Tasks</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="border-2 w-full  border-b-violet-900 rounded-md px-5 py-1 outline-violet-900"
              value={todo}
              onChange={handleChange}
              ref={inputfocus}
            />

            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className="disabled:bg-[#452264]   bg-[#452264] hover:bg-[#452280] font-bold  text-sm text-white rounded-md  py-1 px-4 "
            >
              Save
            </button>
          </div>
        </div>

        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleChange}
          className="my-5"
        />
        <span className="mx-3 font-bold ">Show Finished</span>

        <h2 className="text-lg font-bold">Your Tasks</h2>
        {task.length === 0 && <div className="m-5">No task to display</div>}

        {task.map((item) => {
          return (
            (showFinished || !item.isCompleted) && (
              <div className="flex gap-3  my-4 justify-between" key={item.id}>
                <div className="tasks flex gap-3">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full ">
                  <button
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                    className="bg-[#452264] hover:bg-[#452280] font-bold mx-1  text-sm text-white px-3 py-2 rounded-md "
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="bg-[#452264] hover:bg-[#452280] font-bold mx-1 text-sm text-white px-3 py-2 rounded-md "
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}

export default App;
