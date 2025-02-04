import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';
import { TasksInputDto } from './dto/tasksInput.dto';

@Controller()
export class TasksController {
  constructor(private readonly appService: TasksService) {}

  @Get('/tasks')
  getTasks(): TasksDto[] {
    return this.appService.getTasks();
  }

  @Post('/tasks')
  createTask(@Body() task: TasksInputDto): TasksDto[] {
    return this.appService.createTask(task);
  }
  @Put('/tasks/:taskId')
  updateTask(
    @Param('taskId') id: string,
    @Body() task: TasksInputDto,
  ): TasksDto[] {
    return this.appService.updateTask(parseInt(id, 10), task);
  }
  @Delete('/tasks/:id')
  deleteTask(@Param('id') id: string): TasksDto[] {
    return this.appService.deleteTask(parseInt(id, 10));
  }
}
