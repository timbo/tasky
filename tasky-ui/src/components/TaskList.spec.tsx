import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TaskList from './TaskList'
import { TasksContext } from '../providers/TasksProvider'
import { Task } from '../types/task'

describe('TaskList', () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Test Task 1',
      description: 'Test Description 1',
      done: false,
    },
    {
      id: 2,
      title: 'Test Task 2',
      description: 'Test Description 2',
      done: true,
    },
  ]

  const renderComponent = () =>
    render(
      <TasksContext.Provider value={{ tasks, createTask: jest.fn(), updateTask: jest.fn(), deleteTask: jest.fn() }}>
        <TaskList />
      </TasksContext.Provider>
    )

  test('renders TaskList component', () => {
    renderComponent()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
  })

  test('renders a list of tasks', () => {
    renderComponent()
    expect(screen.getByDisplayValue('Test Task 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Description 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Task 2')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Description 2')).toBeInTheDocument()
  })

  test('renders "No tasks yet." when there are no tasks', () => {
    render(
      <TasksContext.Provider value={{ tasks: [], createTask: jest.fn(), updateTask: jest.fn(), deleteTask: jest.fn() }}>
        <TaskList />
      </TasksContext.Provider>
    )
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument()
  })
})