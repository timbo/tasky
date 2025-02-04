import {
  Button,
  Divider,
  ListItem,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Task } from "../types/task";
import { useContext } from "react";
import { TasksContext } from "../providers/TasksProvider";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask, updateTask } = useContext(TasksContext);

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  const handleUpdate = (e: any) => {
    console.log("e", e.target.checked);
    switch (e.target.id) {
      case "title":
        task.title = e.target.value;
        break;
      case "description":
        task.description = e.target.value;
        break;
      case "done":
        task.done = e.target.checked;
        break;
    }
    const updatedTaskId = task.id;
    if (!updatedTaskId) {
      console.error("Update failed: No ID found");
      return;
    }
    updateTask(updatedTaskId, task);
  };

  return (
    <ListItem key={task.id}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
          width: "100%",
        }}
      >
        <div style={{ padding: "20px 0 20px 0" }}>
          <TextField
            fullWidth
            variant="outlined"
            id="title"
            label="title"
            defaultValue={task.title}
            onInput={handleUpdate}
          />
        </div>

        <div style={{ padding: "20px 0 20px 0" }}>
          <TextField
            fullWidth
            variant="outlined"
            minRows={2}
            multiline
            id="description"
            label="title"
            defaultValue={task.description}
            onInput={handleUpdate}
          />
        </div>

        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              task?.id
                ? handleDelete(task?.id)
                : console.error("Delete failed: No ID found")
            }
          >
            Delete
          </Button>
          <FormControlLabel
            control={
              <Switch id="done" onChange={handleUpdate} checked={task.done} />
            }
            label="Done"
          />
        </div>
      </div>
    </ListItem>
  );
};

export default TaskItem;
