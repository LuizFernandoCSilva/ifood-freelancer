import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Manutenção',
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Manutenção de um sistema de vendas',
  })
  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The status of the task',
    example: 'PENDING',
  })
  public status: string;
  public userId: string;

  public prazo: Date;

  public atualizarStatus(status: string): void {
    this.status = status;
  }
  public definirPrazo(prazo: Date): void {
    this.prazo = prazo;
  }
}
