import { useEffect, useState } from "react";
import "./App.css";
import { toast, Toaster } from "react-hot-toast";
import Todos from "./Todos";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todoState, setTodoState] = useState(false);

  // Add todo function
  const addTodo = () => {
    // Validate title input
    if (!title.trim()) {
      toast.error("Title is required! Please enter a task title.");
      return;
    }

    let newTodoItem = {
      id: allTodos.length === 0 ? 1 : allTodos[allTodos.length - 1].id + 1,
      title: title,
      description: desc,
      status: false,
    };

    let updatedTodoList = [...allTodos, newTodoItem];
    setAllTodos(updatedTodoList);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoList));

    setTitle(""); // Clear input fields
    setDesc("");
    toast.success("Task added successfully! 😃");
  };

  // Delete todo function
  const handleDelete = (id) => {
    let reducedTodo = allTodos.filter((task) => task.id !== id);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
    toast.error("Task deleted! 👍");
  };

  // Mark todo as completed
  const handleComplete = (id) => {
    let completedTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: true };
      }
      return todo;
    });

    localStorage.setItem("todolist", JSON.stringify(completedTodos));
    setAllTodos(completedTodos);
    toast.success("Task completed successfully! 😄");
  };

  useEffect(() => {
    let getTodo = JSON.parse(localStorage.getItem("todolist"));
    if (getTodo) {
      setAllTodos(getTodo);
    }
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: "5%" }}>
        <h1>My Tasks</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-item">
              <label htmlFor="">
                Title{" "}
                <span style={{ fontSize: "18px", color: "#DE3163" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <label htmlFor="">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <button type="button" className="my-btn" onClick={addTodo}>
                ADD
              </button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="btn-area">
              <button
                className={`btn2 ${todoState === false && `active`}`}
                onClick={() => setTodoState(false)}
              >
                Pending Tasks
              </button>
            </div>
            <div className="btn-area">
              <button
                className={`btn2 ${todoState === true && `active`}`}
                onClick={() => setTodoState(true)}
              >
                Completed Tasks
              </button>
            </div>
          </div>
          {allTodos.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No tasks added 🚫
            </p>
          ) : allTodos.filter((e) => e.status === todoState).length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              {todoState === false
                ? "No pending tasks 🚫"
                : "No completed tasks ✅"}
            </p>
          ) : (
            allTodos
              .filter((e) => e.status === todoState)
              .map((item, index) => {
                return (
                  <Todos
                    key={index}
                    item={item}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    todoState={todoState}
                  />
                );
              })
          )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
