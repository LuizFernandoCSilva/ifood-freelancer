import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDTO {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'The telefone of the user',
    example: '35984000000',
  })
  @IsNotEmpty()
  public telefone: string;

  @ApiProperty({
    description: 'The descricao of the user',
    example: 'Desenvolvedor Fullstack',
  })
  public descricao: string;

  @ApiProperty({
    description: 'The habilidades of the user',
    example: ['React', 'Node'],
  })
  @IsNotEmpty()
  public habilidades: string[];

  @ApiProperty({
    description: 'The disponibilidade of the user',
    example: 'full-time, part-time',
  })
  @IsNotEmpty()
  public disponibilidade: string;

  @ApiProperty({
    description: 'The met_pay of the user',
    example: 'pix, crédito',
  })
  @IsNotEmpty()
  public met_pay: string;

  @ApiProperty({
    description: 'The localizacao of the user',
    example: 'Belo Horizonte',
  })
  public localizacao: string;

  @ApiProperty({
    description: 'The type_contratante of the user',
    example: 'empresa',
  })
  @IsNotEmpty()
  public type_contratante: string;
}
