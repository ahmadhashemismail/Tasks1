import { useState, useEffect } from "react";
import { updateTask, deleteTask, getTask } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false)

  useEffect(() => {
    getTask(id)
      .then((task) => {
        setTitle(task.title);
        setNote(task.note);
        setDone(task.done);
      })
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    await updateTask(id, { title: title, note, done });
    navigate("/tasks/");
  }



  return (
    <main className="container">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>✏️ Edit Task</h1>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="note">Task Details</label>
            <textarea
              id="note"
              placeholder="Enter task details or notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="done">
              <input
                id="done"
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
              Mark as Done
            </label>
          </div>

          <button type="submit">💾 Update Task</button>
        </form>


      </div>
    </main>
  );
}

export default EditTaskPage;




