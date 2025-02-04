import { useContext, useRef } from "react";
import { Task } from "../types/task";
import { TasksContext } from "../providers/TasksProvider";
import Button from "@mui/material/Button";
import { FormControlLabel, Switch, TextField, Typography } from "@mui/material";

export const TaskForm = () => {
  const { createTask } = useContext(TasksContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const done = doneRef.current?.checked || false;

    if (!title || !description) {
      return;
    }

    const task: Task = {
      title,
      description,
      done,
    };
    createTask(task);

    // Clear form values
    if (titleRef.current) titleRef.current.value = ''
    if (descriptionRef.current) descriptionRef.current.value = ''
    if (doneRef.current) doneRef.current.checked = false
  };

  return (
    <div style={{ paddingTop: "25px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create A New Task
      </Typography>
      <div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: "10px" }}>
            <TextField inputRef={titleRef} id="title" label="Title" required />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              inputRef={descriptionRef}
              multiline              
              minRows={2}
              id="description"
              label="Description"
              required
            />
          </div>
          <div>
            <FormControlLabel
              control={<Switch inputRef={doneRef} id="done" />}
              label="Done"
            />
            <Button type="submit" variant="contained">
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
