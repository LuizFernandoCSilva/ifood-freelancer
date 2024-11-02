import { v4 as uuid } from 'uuid';

// Interface comum para as propriedades base de qualquer usuário
interface UserBaseProps {
  name: string;
  email: string;
  telefone: string;
  password: string;
}

// Propriedades específicas para UserProfissional
interface UserProfissionalProps extends UserBaseProps {
  habilidades: string[];
  disponibilidade: string;
  areaAtuacao?: string;
  experiencia?: string;
  portfolio?: string[];
  fotoPerfil?: string;
  videoApresentacao?: string;
  metodosPagamentoP?: string;
}

// Propriedades específicas para UserContratante
interface UserContratanteProps extends UserBaseProps {
  tipoContratante: 'pessoa física' | 'jurídica';
  descricaoEmpresa?: string;
  localizacao?: string;
  metodosPagamentoC?: string;
}

// Classe UserProfissional com propriedades específicas para profissionais
export class UserProfissional {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public password: string;
  public descricao: string;
  public readonly created_at: Date;
  public updated_at: Date;
  public telefone: string;
  public habilidades: string[];
  public disponibilidade: string;
  public areaAtuacao?: string;
  public experiencia?: string;
  public portfolio?: string[];
  public fotoPerfil?: string;
  public videoApresentacao?: string;
  public metodosPagamentoP?: string;

  constructor(init: UserProfissionalProps) {
    Object.assign(
      this,
      {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      init,
    );
  }
}

// Classe UserContratante com propriedades específicas para contratantes
export class UserContratante {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public password: string;
  public readonly created_at: Date;
  public updated_at: Date;
  public telefone: string;
  public tipoContratante: 'pessoa física' | 'jurídica';
  public descricaoEmpresa?: string;
  public localizacao?: string;
  public metodosPagamentoC?: string;

  constructor(init: UserContratanteProps) {
    Object.assign(
      this,
      {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      init,
    );
  }
}
