import { Injectable } from '@nestjs/common';
import { User } from '@root/domain/user.domain';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  public async createUser(user: User): Promise<void> {
    this.users.push(user);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
