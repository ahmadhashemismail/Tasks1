import { useEffect, useState } from "react";
import { getTasks, deleteTask, markdone } from "../api";
import { Link } from "react-router-dom";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function remove(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  async function taskremove() {
    const donetask = tasks.filter((t) => t.done);
    const doneIds = donetask.map((t) => t.id);
    await Promise.all(doneIds.map((id) => deleteTask(id)));
    setTasks((prev) => prev.filter((task) => !doneIds.includes(task.id)));
  }

  async function handleDone(task) {
    const updatedTask = { ...task, done: !task.done, };

    await markdone(task.id, updatedTask);

    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  }
  function handletimeleft(task) {
    const endTime = new Date(task.enddate);
    const startTime = new Date(task.date);
    const now = new Date();
    const left = endTime - startTime;
    const days = Math.floor(left / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return <span style={{ color: "red" }}>Expired</span>;
    } else if (now < startTime) {
      return <span style={{ color: "orange" }}>Not started yet</span>;
    } else if (days === 0) {
      return <span style={{ color: "blue" }}>Ends today</span>;
    } else {
      return <span>{days} days left</span>;
    }
  }
  return (
    <main className="container">
      <h1>📋 Task List</h1>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create one to get started!</p>
          <Link
            to="/tasks/new"
            style={{ fontSize: "1.1rem", marginTop: "1rem" }}
          >
            ➕ Create Your First Task
          </Link>
        </div>
      ) : (
        <>
          <button onClick={() => taskremove()}>Remove Done Tasks</button>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <Link to={"/tasks/" + task.id}>
                  <h2>{task.title}</h2>
                  <p>{task.note}</p>
                  <p> time left:{handletimeleft(task)} </p>
                </Link>
                <div className="task-actions">
                  <Link to={"/tasks/" + task.id + "/edit"}>
                    <button className="edit-btn">✏️ Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => remove(task.id)}
                  >
                    🗑️ Delete
                  </button>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleDone(task)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default TaskListPage;
