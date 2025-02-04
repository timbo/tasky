import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';
import { TasksInputDto } from './dto/tasksInput.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should return an array of tasks', () => {
      const result: TasksDto[] = [];
      expect(service.getTasks()).toEqual(result);
    });
  });

  describe('createTask', () => {
    it('should create and return an array of tasks', () => {
      const taskInput: TasksInputDto = {
        title: 'New Task',
        description: 'New Description',
        done: false,
      };
      const result: TasksDto[] = [
        {
          id: 1,
          title: 'New Task',
          description: 'New Description',
          done: false,
        },
      ];
      expect(service.createTask(taskInput)).toEqual(result);
    });

    it('should throw an error if input is invalid', () => {
      const taskInput: any = { title: '', description: 'New Description' };
      expect(() => service.createTask(taskInput)).toThrow();
    });
  });

  describe('updateTask', () => {
    it('should update and return an array of tasks', () => {
      const taskInput: TasksInputDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        done: false,
      };
      service.createTask({
        title: 'Old Task',
        description: 'Old Description',
        done: false,
      });
      const result: TasksDto[] = [
        {
          id: 1,
          title: 'Updated Task',
          description: 'Updated Description',
          done: false,
        },
      ];
      expect(service.updateTask(1, taskInput)).toEqual(result);
    });

    it('should throw an error if input is invalid', () => {
      const taskInput: any = { title: '', description: 'Updated Description' };
      expect(() => service.updateTask(1, taskInput)).toThrow();
    });
  });

  describe('deleteTask', () => {
    it('should delete and return an array of tasks', () => {
      service.createTask({
        title: 'Task to be deleted',
        description: 'Description',
        done: false,
      });
      const result: TasksDto[] = [];
      expect(service.deleteTask(1)).toEqual(result);
    });
  });
});
