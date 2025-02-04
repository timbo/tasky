import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';
import { TasksInputDto } from './dto/tasksInput.dto';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
    tasksService = app.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should return an array of tasks', () => {
      const result: TasksDto[] = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          done: false,
        },
      ];
      jest.spyOn(tasksService, 'getTasks').mockImplementation(() => result);

      expect(tasksController.getTasks()).toBe(result);
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
      jest.spyOn(tasksService, 'createTask').mockImplementation(() => result);

      expect(tasksController.createTask(taskInput)).toBe(result);
    });

    it('should throw an error if input is invalid', () => {
      const taskInput: any = { title: '', description: 'New Description' };
      jest.spyOn(tasksService, 'createTask').mockImplementation(() => {
        throw new Error('Invalid input');
      });

      expect(() => tasksController.createTask(taskInput)).toThrow(
        'Invalid input',
      );
    });
  });

  describe('updateTask', () => {
    it('should update and return an array of tasks', () => {
      const taskInput: TasksInputDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        done: false,
      };
      const result: TasksDto[] = [
        {
          id: 1,
          title: 'Updated Task',
          description: 'Updated Description',
          done: false,
        },
      ];
      jest.spyOn(tasksService, 'updateTask').mockImplementation(() => result);

      expect(tasksController.updateTask('1', taskInput)).toBe(result);
    });

    it('should throw an error if input is invalid', () => {
      const taskInput: any = { title: '', description: 'Updated Description' };
      jest.spyOn(tasksService, 'updateTask').mockImplementation(() => {
        throw new Error('Invalid input');
      });

      expect(() => tasksController.updateTask('1', taskInput)).toThrow(
        'Invalid input',
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete and return an array of tasks', () => {
      const result: TasksDto[] = [];
      jest.spyOn(tasksService, 'deleteTask').mockImplementation(() => result);

      expect(tasksController.deleteTask('1')).toBe(result);
    });

    it('should throw an error if id is invalid', () => {
      jest.spyOn(tasksService, 'deleteTask').mockImplementation(() => {
        throw new Error('Invalid id');
      });

      expect(() => tasksController.deleteTask('invalid')).toThrow('Invalid id');
    });
  });
});
