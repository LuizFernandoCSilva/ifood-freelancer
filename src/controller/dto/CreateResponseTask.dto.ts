import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResponseDTO {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Manutenção',
  })
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
