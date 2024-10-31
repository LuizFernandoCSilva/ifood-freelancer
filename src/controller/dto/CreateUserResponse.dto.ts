import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDTO {
  @ApiProperty({
    description: 'The id of created user',
    example: '209c3b1e-3f3b-4b1e-8f3d-3f3b4b1e8f3d',
  })
  public id: string;

  @ApiProperty({
    description: 'The name of created user',
    example: 'John Doe',
  })
  public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
