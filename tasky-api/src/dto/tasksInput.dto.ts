import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TasksInputDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
