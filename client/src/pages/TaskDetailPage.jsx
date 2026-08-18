import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTask } from "../api";

function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTask(id).then(setTask);
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <main className="container">
      <div className="task-detail">

        <p><strong>Title:</strong></p>
        <p>{task.title}</p>
        <p><strong>Note:</strong></p>
        <p>{task.note}</p>
        <p><strong>Date:</strong></p>
        <p>{task.date}</p>
        <div className="task-actions">
          <Link to={`/tasks/${id}/edit`}>
              <button className="edit-btn">✏️ Edit Task</button>
          </Link>
          <Link to="/tasks">
            <button style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "2px solid var(--accent-border)" }}>← Back to List</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TaskDetailPage;