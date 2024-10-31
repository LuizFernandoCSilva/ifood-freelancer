import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_ENDPOINT_METADATA_KEY } from '../shared/constantes';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ENDPOINT_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Se a rota for pública, permite acesso sem autenticação
    if (isPublic) {
      return true;
    }

    // Se não for pública, aplica o guard padrão JWT
    const result = super.canActivate(context);
    if (result instanceof Observable) {
      return result.toPromise();
    }
    return result;
  }
}
