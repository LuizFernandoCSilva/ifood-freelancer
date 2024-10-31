import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../services/jwt-auth.guard';
import { CreateTaskDTO } from './dto/CreateRequestTask.dto';
import { TasksService } from '../services/tasks.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTaskResponseDTO } from './dto/CreateResponseTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created',
    type: CreateTaskDTO,
  })
  async createTask(
    @Body() createTaskBody: CreateTaskDTO,
    @Request() req: any,
  ): Promise<CreateTaskResponseDTO> {
    const userId = req.user.sub;
    await this.taskService.createTask({
      name: createTaskBody.name,
      description: createTaskBody.description,
      userId,
      status: createTaskBody.status,
      prazo: createTaskBody.prazo,
    });
    return new CreateTaskResponseDTO(createTaskBody.name);
  }
}
