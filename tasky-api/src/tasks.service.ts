import { Injectable } from '@nestjs/common';
import { TasksDto } from './dto/tasks.dto';
import { TasksInputDto } from './dto/tasksInput.dto';

@Injectable()
export class TasksService {
  private tasks: TasksDto[] = [];
  private idCounter = 1;

  getTasks(): TasksDto[] {
    return this.tasks;
  }

  createTask(task: TasksInputDto): TasksDto[] {
    if (
      !task.title ||
      task.title.length === 0 ||
      !task.description ||
      task.description.length === 0 ||
      typeof task.done !== 'boolean'
    ) {
      throw new Error('Invalid input');
    }

    const newTask: TasksDto = {
      id: this.idCounter++,
      title: task.title,
      description: task.description,
      done: task.done,
    };

    this.tasks.push(newTask);
    return this.tasks;
  }

  updateTask(id: number, task: TasksInputDto): TasksDto[] {
    if (
      !task.title ||
      task.title.length === 0 ||
      !task.description ||
      task.description.length === 0 ||
      typeof task.done !== 'boolean'
    ) {
      throw new Error('Invalid input');
    }

    this.tasks = this.tasks.map((t) => {
      if (t.id === id) {
        return { ...t, ...task };
      }
      return t;
    });
    return this.tasks;
  }

  deleteTask(id: number): TasksDto[] {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks;
  }
}
