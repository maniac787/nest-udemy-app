import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolMetadata = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );
    console.log('__ROLES_METADATA__', rolMetadata);

    const req = context.getArgByIndex(0);
    const { roles } = req.user;

    console.log('__ROLES__', roles);

    // iterar los roles de usuarios sobre el array de roles permitidos
    const isAllow = roles.some((rol: string) => rolMetadata.includes(rol));

    return isAllow;
  }
}
