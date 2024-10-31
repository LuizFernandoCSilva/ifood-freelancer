import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.domain';

@Injectable()
export class TasksRepository {
  private tasks: Task[] = [];

  public async createTask(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  public async getTaskById(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  public async getTasksByUserId(userId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.userId === userId);
  }

  public async updateTask(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[index] = task;
  }

  public async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
