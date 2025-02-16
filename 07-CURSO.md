# Interceptors

```shell
nest g itc utils/Logger
```

```js

@Controller("videos")
@UsePipes(new ValidationPipe())
// Interceptor
@UseInterceptors(LoggerInterceptor)
export class VideosController {

}
```

En NestJS, los interceptores son una de las características más poderosas y versátiles del framework. Forman parte del
sistema de AOP (Programación Orientada a Aspectos) y permiten modificar el flujo de ejecución de las solicitudes y
respuestas en tu aplicación. Los interceptores se ejecutan antes y después de que un controlador maneje una solicitud,
lo que los hace ideales para tareas como:

1. Transformar la respuesta
   Los interceptores pueden modificar la respuesta que se envía al cliente. Por ejemplo, puedes envolver la respuesta en
   una estructura común (como un objeto con data y status).

Ejemplo:

```typescript

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ success: true, data })),
    );
  }
}
```

Esto transformaría una respuesta como { name: 'John' } en { success: true, data: { name: 'John' } }.

2. Modificar la solicitud entrante
   Puedes usar interceptores para transformar o validar los datos de la solicitud antes de que lleguen al controlador.

Ejemplo: Convertir todos los parámetros de la solicitud a minúsculas.

3. Manejar errores
   Los interceptores pueden capturar excepciones y transformarlas en respuestas de error personalizadas.

Ejemplo:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => throwError(() => new HttpException('Error personalizado', 400))),
    );
  }
}
```

4. Agregar lógica transversal
   Los interceptores son ideales para agregar lógica que se aplica a múltiples rutas o controladores, como:

Logging (registro de actividades).

Medición del tiempo de ejecución.

Validación de datos.

Ejemplo de logging:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Antes de la ejecución...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Después de la ejecución... Tiempo: ${Date.now() - now}ms`)),
    );
  }
}
```

5. Cachear respuestas
   Puedes usar interceptores para implementar un sistema de caché que almacene respuestas y las reutilice para
   solicitudes idénticas.

Ejemplo:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = request.url;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)); // Devuelve la respuesta en caché
    }

    return next.handle().pipe(
      tap(response => this.cache.set(cacheKey, response)), // Almacena en caché
    );

  }
}
```

6. Controlar el flujo de ejecución
   Los interceptores pueden detener o redirigir el flujo de ejecución de una solicitud antes de que llegue al
   controlador.

Ejemplo: Verificar permisos antes de permitir el acceso a un recurso.

¿Cómo se usan los interceptores?
Los interceptores se pueden aplicar a diferentes niveles en NestJS:

A nivel global:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}

bootstrap();
```

A nivel de controlador:

```typescript
import { Controller, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
}

A
nivel
de
método:

  typescript
Copy
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

@Controller('users')
export class UsersController {
  @Get()
  @UseInterceptors(TransformInterceptor)
  findAll() {
    return [{ name: 'John' }];
  }
}
```

Resumen
Los interceptores en NestJS son una herramienta poderosa para:

Transformar respuestas.

Modificar solicitudes.

Manejar errores.

Agregar lógica transversal (como logging o caching).

Controlar el flujo de ejecución.

Su flexibilidad los hace ideales para implementar funcionalidades que deben aplicarse de manera consistente en toda la
aplicación, sin repetir código en múltiples lugares.