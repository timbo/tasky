import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TaskForm } from "./TaskForm";
import { TasksContext } from "../providers/TasksProvider";
import { Task } from "../types/task";

describe("TaskForm", () => {
  const createTask = jest.fn();
  const updateTask = jest.fn();
  const deleteTask = jest.fn();
  const tasks: Task[] = [];

  const renderComponent = () =>
    render(
      <TasksContext.Provider
        value={{ tasks, createTask, updateTask, deleteTask }}
      >
        <TaskForm />
      </TasksContext.Provider>
    );

  beforeEach(() => {
    createTask.mockClear();
  });

  test("renders TaskForm component", () => {
    renderComponent();
    expect(screen.getByText("Create A New Task")).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    renderComponent();

    act(() => {
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "Test Task" },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: "Test Description" },
      });
      fireEvent.click(screen.getByLabelText(/done/i));
      fireEvent.click(screen.getByText("Add Task"));
    });

    expect(createTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      done: true,
    });
  });

  test("does not submit form with invalid data", () => {
    renderComponent();

    act(() => {
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "" },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: "" },
      });
      fireEvent.click(screen.getByText("Add Task"));
    });

    expect(createTask).not.toHaveBeenCalled();
  });

  test("clears form after submission", () => {
    renderComponent();

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      /description/i
    ) as HTMLInputElement;
    const doneInput = screen.getByLabelText(/done/i) as HTMLInputElement;

    act(() => {
      fireEvent.change(titleInput, { target: { value: "Test Task" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Test Description" },
      });
      fireEvent.click(doneInput);
      fireEvent.click(screen.getByText("Add Task"));
    });

    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
    expect(doneInput.checked).toBe(false);
  });
});
