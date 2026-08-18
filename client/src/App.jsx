import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage";
import TaskListPage from "./pages/tasklistpage";
import TaskDetailPage from "./pages/TaskDetailPage";
import AddTaskPage from "./pages/addtaskpage";
import EditTaskPage from "./pages/edittaskpage";
import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const account = localStorage.getItem("account");

  return (
    <>
      {!isLoginPage && (
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/tasks/new">Add Task</Link>
          {account && (
            <span
              style={{ marginLeft: "auto", cursor: "pointer", color: "var(--text-muted)" }}
              onClick={() => { localStorage.removeItem("account"); window.location.href = "/login"; }}
            >
              Sign Out
            </span>
          )}
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={account ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={account ? <TaskListPage /> : <Navigate to="/login" />} />
        <Route path="/tasks/new" element={account ? <AddTaskPage /> : <Navigate to="/login" />} />
        <Route path="/tasks/:id" element={account ? <TaskDetailPage /> : <Navigate to="/login" />} />
        <Route path="/tasks/:id/edit" element={account ? <EditTaskPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;