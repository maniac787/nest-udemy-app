# GUARDIANES

```shell
nest g guard guards/BrowserAgent
```

```shell
nest g guard guards/JwtGuards
```

```shell
yarn add @nestjs/passport passport @types/passport-jwt
```

Los paquetes @nestjs/passport y passport se utilizan en aplicaciones NestJS para implementar autenticación de manera
sencilla y eficiente. Aquí te explico para qué sirve cada uno:

1. passport
   Passport es una librería de autenticación para Node.js que se utiliza para manejar la autenticación en aplicaciones
   web.

Es altamente modular y permite integrar diferentes estrategias de autenticación, como:

Autenticación local (usuario y contraseña).

Autenticación con redes sociales (Google, Facebook, Twitter, etc.).

Autenticación con tokens (JWT, OAuth, etc.).

Passport se encarga de gestionar el flujo de autenticación, como la verificación de credenciales, la creación de
sesiones, y la generación de tokens.

2. @nestjs/passport
   @nestjs/passport es un módulo oficial de NestJS que integra Passport con el framework NestJS.

Proporciona decoradores, guards y otras utilidades para facilitar la implementación de la autenticación en una
aplicación NestJS.

Con @nestjs/passport, puedes:

Usar guards para proteger rutas y controladores.

Implementar estrategias de autenticación de manera modular.

Integrar Passport con otras características de NestJS, como los interceptores y los pipes.

¿Para qué se usan juntos?
passport proporciona las estrategias de autenticación y la lógica de verificación.

@nestjs/passport integra esas estrategias en NestJS, permitiendo proteger rutas y manejar la autenticación de forma
nativa en el framework.

Ejemplo de uso común:
Instalación:

```bash

npm install @nestjs/passport passport passport-local
Implementación de una estrategia de autenticación local:
```

```typescript

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

Protección de rutas con un guard:

```typescript

import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
```

Resumen:
passport es la librería base para autenticación en Node.js.

@nestjs/passport es la integración de Passport en NestJS, facilitando su uso en aplicaciones NestJS.

Juntos, permiten implementar autenticación de manera robusta y modular en tu aplicación.