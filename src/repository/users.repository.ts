import { Injectable } from '@nestjs/common';
import { UserProfissional, UserContratante } from '@root/domain/user.domain';
@Injectable()
export class UsersRepository {
  private usersProfissionais: UserProfissional[] = [];
  private usersContratantes: UserContratante[] = [];

  public async createUserProfissional(user: UserProfissional): Promise<void> {
    this.usersProfissionais.push(user);
  }

  public async createUserContratante(user: UserContratante): Promise<void> {
    this.usersContratantes.push(user);
  }

  public async getUserByEmail(
    email: string,
  ): Promise<UserProfissional | UserContratante | undefined> {
    // Procura nas duas listas para retornar qualquer tipo de usuário com o mesmo email
    return (
      this.usersProfissionais.find((user) => user.email === email) ||
      this.usersContratantes.find((user) => user.email === email)
    );
  }
}
