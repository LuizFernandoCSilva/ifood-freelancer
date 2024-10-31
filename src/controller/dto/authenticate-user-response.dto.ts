import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserResponseDTO {
  @ApiProperty({
    name: 'acessToken',
    description: 'JWT acess token',
  })
  public acessToken: string;

  constructor(acessToken: string) {
    this.acessToken = acessToken;
  }
}
