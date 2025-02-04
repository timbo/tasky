import { Task } from "../types/task";

const API_URL = "http://localhost:3000/tasks";

export async function getTaskApi() {
    try {
        const response = await fetch(API_URL)
        return await response.json();
    } catch (error: unknown) {  
        throw new Error(`Failed to fetch tasks: ${error}`)
    }
}

export async function createTaskApi(task: Task): Promise<Task[]> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
        return await response.json()

    } catch (error: unknown) {   
        throw new Error(`Failed to create task: ${error}`)
    }
}

export async function updateTaskApi(id: number, task: Task) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        return await response.json()
    } catch (error: unknown) {
        throw new Error(`Failed to update task: ${error}`)
    }
}

export async function deleteTaskApi(id: number) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error: unknown) {
    throw new Error(`Failed to delete task: ${error}`)
  }
}