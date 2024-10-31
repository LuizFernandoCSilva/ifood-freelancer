import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@root/repository/users.repository';
import { User } from '@root/domain/user.domain';
import { hash } from 'bcrypt';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  telefone: string;
  habilidades: string[];
  disponibilidade: string;
  met_pay: string;
  localizacao: string;
  type_contratante: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  public async createUser(
    params: CreateUserParams,
  ): Promise<{ id: string; name: string }> {
    const userExists = await this.usersRepository.getUserByEmail(params.email);

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await hash(params.password, 10);

    const user = new User({
      name: params.name,
      email: params.email,
      telefone: params.telefone,
      password: passwordHash,
      habilidades: params.habilidades,
      disponibilidade: params.disponibilidade,
      met_pay: params.met_pay,
      localizacao: params.localizacao,
      type_contratante: params.type_contratante,
    });

    await this.usersRepository.createUser(user);
    return { id: user.id, name: user.name };
  }
}
