import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateUserRequestDTO {
  @ApiProperty({
    name: 'email',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
