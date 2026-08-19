import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api";

function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [ date, setDate] = useState("");
  const [enddate, setEnddate] = useState("");
  const[error,setError] =useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()||   !date || handletime(date)) {
      setError("Please enter a task title and date");
      return;
    }
    await createTask({ title, note, date,enddate });
    navigate("/tasks");
  }
  function handletime(date){
    let startdate=  new Date(date);
  let datenow=new Date();
    if(startdate<datenow){
    console.log(<p style={{color:"red"}}>start date is in the past</p>)
    }
    
  }
  return (

    <main className="container">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>➕ Create New Task</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
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
      <div> <label htmlFor="date">Task start  Date</label>
        <input
          id="date"
          type="date"
          value={date}
        onChange={(e) => {
  setDate(e.target.value);
  handletime(e.target.value);
}} />
(error&& <p style={{color:"red"}}>your enter invailed date </p> )
</div>
<div> <label htmlFor="enddate">Task End Date</label>
        <input
          id="enddate"
          type="date"
          value={enddate}
          onChange={(e) => setEnddate(e.target.value)} /></div> 
      <button type="submit">💾 Save Task</button>
    </form>
      </div >
    </main >
  );
}

export default AddTaskPage;







