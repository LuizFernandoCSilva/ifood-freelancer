import { v4 as uuid } from 'uuid';

interface UserProps {
  name: string;
  email: string;
  telefone: string;
  password: string;
  habilidades: string[];
  disponibilidade: string;
  met_pay: string;
}

type UserUpdate = Partial<User> & UserProps;

export class User {
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
  public met_pay: string;
  public localizacao: string;
  public type_contratante: string;

  constructor(init: UserUpdate) {
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
