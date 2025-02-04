import { useContext } from "react";
import { TasksContext } from "../providers/TasksProvider";
import { List, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const ToDoList = () => {
  const { tasks } = useContext(TasksContext);

  if (!tasks || tasks.length === 0) {
    return (
      <Typography variant="h6" component="h3" gutterBottom>
        No tasks yet.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h5" component="h3" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
        ))}
      </List>
    </div>
  );
};

export default ToDoList;
