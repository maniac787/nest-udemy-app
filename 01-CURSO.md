# Estructura de Carpetas y Archivos

1) src/: Esta es la carpeta principal donde se encuentra el código fuente de tu aplicación.

    - **main.ts**: Es el punto de entrada de la aplicación. Aquí se inicializa la aplicación NestJS y se pone en marcha el
      servidor.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

- **app.module.ts**: Es el módulo raíz de la aplicación. Aquí se definen los controladores, servicios y otros módulos que se
  utilizan en la aplicación.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
```

- **app.controller.ts**: Es el controlador principal de la aplicación. Aquí se definen las rutas y los manejadores de las
  solicitudes HTTP.

```typescript

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

- **app.service.ts**: Es el servicio principal de la aplicación. Aquí se define la lógica de negocio que puede ser utilizada
  por los controladores.

```typescript

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

2) test/: Esta carpeta contiene los archivos de prueba de la aplicación.

    - app.e2e-spec.ts: Es un archivo de prueba end-to-end (e2e) que verifica el funcionamiento básico de la aplicación.

```typescript

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

3) node_modules/: Esta carpeta contiene todas las dependencias de Node.js instaladas para tu proyecto.

4) package.json: Este archivo define las dependencias del proyecto, scripts y otra información relevante.

```json
{
  "name": "my-nest-app",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/platform-express": "^8.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.0.0",
    "@nestjs/testing": "^8.0.0",
    "jest": "^27.0.0",
    "supertest": "^6.0.0",
    "typescript": "^4.0.0"
  }
}
```

5) tsconfig.json: Este archivo contiene la configuración del compilador de TypeScript.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

6) nest-cli.json: Este archivo contiene la configuración específica para el CLI de NestJS.

```json

{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}
```

Resumen

- **src/**: Contiene el código fuente de la aplicación.

- **test/**: Contiene los archivos de prueba.

- **node_modules/**: Contiene las dependencias de Node.js.

- **package.json**: Define las dependencias y scripts del proyecto.

- **tsconfig.json**: Configuración del compilador de TypeScript.

- **nest-cli.json**: Configuración específica del CLI de NestJS.

Esta estructura es el punto de partida para cualquier aplicación NestJS y puede ser extendida y modificada según las
necesidades del proyecto.