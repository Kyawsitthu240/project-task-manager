import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://task-manager-backend.onrender.com";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To Do");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  // ===== GET TASKS =====
  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ===== ADD / UPDATE TASK =====
  const addTask = async () => {
    if (!task.trim()) return;

    const newTask = {
      text: task,
      priority,
      deadline: deadline || null,
      status,
      completed: status === "Done",
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/tasks/${editId}`, newTask);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/tasks`, newTask);
      }

      fetchTasks();

      setTask("");
      setPriority("Medium");
      setDeadline("");
      setStatus("To Do");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.error || "Task add failed");
    }
  };

  // ===== DELETE =====
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  // ===== EDIT =====
  const editTask = (t) => {
    setTask(t.text);
    setPriority(t.priority);
    setDeadline(t.deadline || "");
    setStatus(t.status);
    setEditId(t.id);
  };

  // ===== TOGGLE COMPLETE (FIXED) =====
  const toggleComplete = async (t) => {
    await axios.put(`${API_URL}/tasks/${t.id}`, {
      text: t.text,
      priority: t.priority,
      deadline: t.deadline,
      status: !t.completed ? "Done" : "To Do",
      completed: !t.completed,
    });

    fetchTasks();
  };

  // ===== FILTER =====
  const filteredTasks = tasks.filter((t) => {
    const matchSearch = t.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Completed")
      return t.completed && matchSearch;

    if (filter === "Pending")
      return !t.completed && matchSearch;

    if (filter === "To Do")
      return t.status === "To Do" && matchSearch;

    if (filter === "In Progress")
      return t.status === "In Progress" && matchSearch;

    if (filter === "Done")
      return t.status === "Done" && matchSearch;

    return matchSearch;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="app">
      <div className="container">
        <h1>🚀 Project Task Manager</h1>

        <div className="stats">
          <div>Total: {total}</div>
          <div>Completed: {completed}</div>
          <div>Pending: {pending}</div>
        </div>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* INPUT */}
        <div className="input-group">
          <input
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button onClick={addTask}>
            {editId ? "Save" : "Add"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="filters">
          {[
            "All",
            "To Do",
            "In Progress",
            "Done",
            "Completed",
            "Pending",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {filteredTasks.map((t) => (
            <div className="task-card" key={t.id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t)}
                />

                <div>
                  <h3 className={t.completed ? "done" : ""}>
                    {t.text}
                  </h3>
                  <p>Priority: {t.priority}</p>
                  <p>Status: {t.status}</p>
                  <p>
                    Deadline: {t.deadline || "No deadline"}
                  </p>
                </div>
              </div>

              <div className="task-buttons">
                <button
                  className="edit"
                  onClick={() => editTask(t)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
