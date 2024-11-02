// dto/CreateUserRequest.dto.ts
import {
  IsOptional,
  IsString,
  IsArray,
  IsIn,
  ValidateIf,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Disponibilidade {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
}

export class CreateUserRequestDTO {
  @ApiProperty({
    description: 'Tipo de usuário: profissional ou contratante',
    enum: ['profissional', 'contratante'],
  })
  @IsString()
  @IsIn(['profissional', 'contratante'])
  userType: 'profissional' | 'contratante';

  // Campos comuns
  @ApiProperty({ description: 'Nome completo ou nome da empresa' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'E-mail de contato do usuário' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Senha de acesso do usuário' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Telefone de contato do usuário' })
  @IsString()
  telefone: string;

  // Campos específicos para o usuário profissional
  @ApiProperty({
    description: 'Área de atuação do profissional',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsString()
  areaAtuacao: string;

  @ApiProperty({
    description: 'Lista de habilidades e competências do profissional',
    type: [String],
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsArray()
  @IsString({ each: true })
  habilidades: string[];

  @ApiProperty({
    description: 'Experiência profissional do usuário',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsString()
  experiencia: string;

  @ApiProperty({
    description:
      'Portfólio do profissional, contendo links para projetos anteriores',
    type: [String],
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsArray()
  @IsUrl({}, { each: true })
  portfolio: string[];

  @ApiProperty({
    description: 'Foto de perfil ou logotipo da empresa',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsUrl()
  fotoPerfil: string;

  @ApiProperty({
    description: 'Disponibilidade do profissional',
    enum: Disponibilidade,
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsEnum(Disponibilidade)
  disponibilidade: Disponibilidade;

  @ApiProperty({
    description: 'Link para vídeo de apresentação do profissional',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsUrl()
  videoApresentacao: string;

  @ApiProperty({
    description: 'Métodos de pagamento aceitos pelo profissional',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'profissional')
  @IsString()
  metodosPagamentoP: string;

  // Campos específicos para o usuário contratante
  @ApiProperty({
    description: 'Tipo de contratante: pessoa física ou jurídica',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'contratante')
  @IsString()
  tipoContratante: 'pessoa física' | 'jurídica';

  @ApiProperty({
    description: 'Descrição opcional da empresa do contratante',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'contratante')
  @IsOptional()
  @IsString()
  descricaoEmpresa?: string;

  @ApiProperty({
    description: 'Localização do contratante (bairro, cidade e país)',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'contratante')
  @IsString()
  localizacao: string;

  @ApiProperty({
    description: 'Métodos de pagamento aceitos pelo contratante',
    required: false,
  })
  @ValidateIf((o) => o.userType === 'contratante')
  @IsString()
  metodosPagamentoC: string;
}
