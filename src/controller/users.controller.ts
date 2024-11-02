import { UsersService } from '../services/users.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/CreateUserRequest.dto';
import { CreateUserResponseDTO } from './dto/CreateUserResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@root/shared/public.decorator';

@ApiTags('users')
@Controller('users')
export class UserControllers {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User (Profissional ou Contratante) criado com sucesso',
    type: CreateUserResponseDTO,
  })
  public async createUser(
    @Body() createUserBody: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const { userType, name, email, telefone, password } = createUserBody;

    // Construir o payload de acordo com o tipo de usuário
    const userData = {
      userType,
      name,
      email,
      telefone,
      password,
      ...(userType === 'profissional' && {
        areaAtuacao: createUserBody.areaAtuacao,
        habilidades: createUserBody.habilidades,
        experiencia: createUserBody.experiencia,
        portfolio: createUserBody.portfolio,
        fotoPerfil: createUserBody.fotoPerfil,
        disponibilidade: createUserBody.disponibilidade,
        videoApresentacao: createUserBody.videoApresentacao,
        metodosPagamento: createUserBody.metodosPagamentoP,
      }),
      ...(userType === 'contratante' && {
        tipoContratante: createUserBody.tipoContratante,
        descricaoEmpresa: createUserBody.descricaoEmpresa,
        localizacao: createUserBody.localizacao,
        metodosPagamento: createUserBody.metodosPagamentoC,
      }),
    };

    // Chama o serviço de criação de usuário
    const createdUser = await this.usersService.createUser(userData);

    // Retorna a resposta com o ID e nome do usuário criado
    return new CreateUserResponseDTO(createdUser.id, createdUser.name);
  }
}
