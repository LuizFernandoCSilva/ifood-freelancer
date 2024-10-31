import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '../domain/task.domain';
import { TasksRepository } from '../repository/task.repository';

interface CreateTaskParams {
  name: string;
  description: string;
  userId: string;
  status: string;
  prazo: Date;
}

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  public async createTask(params: CreateTaskParams): Promise<string> {
    const taskExists = await this.tasksRepository.getTaskById(params.userId);

    if (taskExists) {
      throw new BadRequestException('Task already exists');
    }

    const task = new Task({
      name: params.name,
      description: params.description,
      userId: params.userId,
      prazo: params.prazo,
      status: params.status,
    });

    await this.tasksRepository.createTask(task);
    return task.id;
  }
}
