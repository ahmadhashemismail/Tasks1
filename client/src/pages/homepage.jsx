import { useEffect, useState } from "react";
import { getTasks } from "../api";
import { Link } from "react-router-dom";

function Homepage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);
let done =tasks.filter((t)=>t.done).length
  return (
    <main className="container">
      <h1>🏠 Welcome to Task Manager</h1>
      <div className="stats">
        <p>📊 Total Tasks: <strong>{tasks.length}</strong></p>
      <p> Done={done}</p>
      tasks left ={tasks.length-done}
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/tasks" style={{ fontSize: "1.1rem" }}>
          👉 View All Tasks
        </Link>
      </div>
    </main>
  );
}

export default Homepage;