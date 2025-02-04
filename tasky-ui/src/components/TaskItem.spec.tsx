import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TaskItem from './TaskItem'
import { TasksContext } from '../providers/TasksProvider'
import { Task } from '../types/task'

describe('TaskItem', () => {
  const deleteTask = jest.fn()
  const updateTask = jest.fn()
  const tasks: Task[] = []

  const task: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    done: false,
  }

  const renderComponent = () =>
    render(
      <TasksContext.Provider value={{ tasks, createTask: jest.fn(), updateTask, deleteTask }}>
        <TaskItem task={task} />
      </TasksContext.Provider>
    )

  beforeEach(() => {
    deleteTask.mockClear()
    updateTask.mockClear()
  })

  test('renders TaskItem component', () => {
    renderComponent()
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument()
  })

  test('calls deleteTask when delete button is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByText('Delete'))
    expect(deleteTask).toHaveBeenCalledWith(task.id)
  })
})