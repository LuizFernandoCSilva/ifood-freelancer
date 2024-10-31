import { v4 as uuid } from 'uuid';

interface TaskProps {
  name: string;
  description: string;
  userId: string;
  prazo: Date;
}

type TaskUpdate = Partial<Task> & TaskProps;

export class Task {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly userId: string;
  public prazo: Date;
  public status: string;
  public readonly created_at: Date;
  public updated_at: Date;

  constructor(init: TaskUpdate) {
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

  public atualizarStatus(status: string): void {
    this.status = status;
  }

  public definirPrazo(prazo: Date): void {
    this.prazo = prazo;
  }
}
