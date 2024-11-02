import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@root/repository/users.repository';
import { UserProfissional, UserContratante } from '@root/domain/user.domain';
import { hash } from 'bcrypt';

interface CreateUserParams {
  userType: 'profissional' | 'contratante';
  name: string;
  email: string;
  password: string;
  telefone: string;
  areaAtuacao?: string;
  habilidades?: string[];
  experiencia?: string;
  portfolio?: string[];
  fotoPerfil?: string;
  disponibilidade?: string;
  videoApresentacao?: string;
  metodosPagamentoP?: string;
  tipoContratante?: 'pessoa física' | 'jurídica';
  descricaoEmpresa?: string;
  localizacao?: string;
  metodosPagamentoC?: string;
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

    // Verificar o tipo de usuário e criar o objeto de acordo
    let user: UserProfissional | UserContratante;
    if (params.userType === 'profissional') {
      user = new UserProfissional({
        name: params.name,
        email: params.email,
        telefone: params.telefone,
        password: passwordHash,
        areaAtuacao: params.areaAtuacao,
        habilidades: params.habilidades,
        experiencia: params.experiencia,
        portfolio: params.portfolio,
        fotoPerfil: params.fotoPerfil,
        disponibilidade: params.disponibilidade,
        videoApresentacao: params.videoApresentacao,
        metodosPagamentoP: params.metodosPagamentoP,
      });
      await this.usersRepository.createUserProfissional(user);
    } else if (params.userType === 'contratante') {
      user = new UserContratante({
        name: params.name,
        email: params.email,
        telefone: params.telefone,
        password: passwordHash,
        tipoContratante: params.tipoContratante,
        descricaoEmpresa: params.descricaoEmpresa,
        localizacao: params.localizacao,
        metodosPagamentoC: params.metodosPagamentoC,
      });
      await this.usersRepository.createUserContratante(user);
    } else {
      throw new BadRequestException('Invalid user type');
    }

    return { id: user.id, name: user.name };
  }
}
