import { useEffect, useState, createContext } from "react";
import {
  getTaskApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../services/tasksService";
import { Task } from "../types/task";
import { ReactNode } from "react";

interface TasksContextType {
  tasks: Task[];
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: number, updatedTask: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const tasks = await getTaskApi();
    setTasks(tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (task: Task) => {
    const tasks = await createTaskApi(task);
    setTasks(tasks);
  };

  const updateTask = async (id: number, updatedTask: Task) => {
    const tasks = await updateTaskApi(id, updatedTask);
    setTasks(tasks);
  };

  const deleteTask = async (id: number) => {
    const tasks = await deleteTaskApi(id);
    setTasks(tasks);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
