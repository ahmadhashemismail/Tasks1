const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await db.query("select * from tasks order by id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const result = await db.query("select * from tasks where id=$1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const result = await db.query("delete from tasks where id=$1 returning *", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, note, date,enddate, done } = req.body;
    const result = await db.query(
      "update tasks set title=$1, note=$2, done=$3, date=$4, enddate=$5 where id=$6 returning *",
      [title, note, done, date, enddate, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/markdone/:id", async (req, res) => {
  try {
    const { done } = req.body;
    const result = await db.query(
      "update tasks set done=$1 where id=$2 returning *",
      [done, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/tasks", async (req, res) => {
  try {
    const { title, note,date,enddate, done } = req.body;
    const result = await db.query(
      "insert into tasks (title,note,date,enddate,done) values ($1, $2,$3, $4, $5) returning *",
      [title, note,date,enddate,done],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
});

// ── Accounts ──────────────────────────────────────────────
app.post("/api/accounts/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existing = await db.query(
      "select id from accounts where email=$1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already in use." });
    }
    const result = await db.query(
      "insert into accounts (name, email, password) values ($1, $2, $3) returning id, name, email",
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error registering account:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/accounts/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(
      "select id, name, email, password from accounts where email=$1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const account = result.rows[0];
    if (account.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    res.json({ id: account.id, name: account.name, email: account.email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
