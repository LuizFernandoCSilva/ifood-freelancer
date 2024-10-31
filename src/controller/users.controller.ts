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
    description: 'User created',
    type: CreateUserResponseDTO,
  })
  public async createUser(
    @Body() createUserBody: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const createdUser = await this.usersService.createUser({
      name: createUserBody.name,
      email: createUserBody.email,
      telefone: createUserBody.telefone,
      password: createUserBody.password,
      habilidades: createUserBody.habilidades,
      disponibilidade: createUserBody.disponibilidade,
      met_pay: createUserBody.met_pay,
      type_contratante: createUserBody.type_contratante,
      localizacao: createUserBody.localizacao,
    });
    return new CreateUserResponseDTO(createdUser.id, createdUser.name);
  }
}
