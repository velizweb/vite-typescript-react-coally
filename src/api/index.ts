import { useAuth } from "../context/AuthContext";
import { Task } from "../types";

const { token } = useAuth();
const api_url = import.meta.env.VITE_BACKEND_URL;

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(
      `${api_url}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error Login", error);
  }
}

export async function fetchTask() {
  try {
    const response = await fetch(`${api_url}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetch", error);
  }
}

export async function addTask(task: Task) {
  try {
    const response = await fetch(`${api_url}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error add", error);
  }
}

export async function updateTask(task: Task) {
  try {
    const response = await fetch(
      `${api_url}/task/${task._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error add", error);
  }
}

export async function removeTask(task: string | number | undefined) {
  try {
    const response = await fetch(`${api_url}/task/${task}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error add", error);
  }
}
