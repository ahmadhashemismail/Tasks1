const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const BASE = `${API_URL}/api`;

export async function getTasks() {
    const res = await fetch(BASE + "/tasks" ,{
        method:"get",
    });
    return res.json();
}

export async function getTask(id) {
    const res = await fetch(BASE + "/tasks/" + id);
    return res.json();
}

export async function updateTask(id, task) {
    const res = await fetch(BASE + "/tasks/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(task)
    });
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(BASE + "/tasks/" + id, {
        method: "DELETE"
    });
    return res.json();
}


export async function markdone(id, task) {
    const res = await fetch(BASE + "/markdone/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(task)
    });
    return res.json();
}

export async function createTask(task) {
    const res = await fetch(BASE + "/tasks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(task)
    });
    return res.json();
}

export async function loginAccount(credentials) {
    const res = await fetch(BASE + "/accounts/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return res.json();
}

export async function registerAccount(data) {
    const res = await fetch(BASE + "/accounts/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
