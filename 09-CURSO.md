# Pasos para implementar TypeORM

## PostgreSQL en NestJS

1. Crear un proyecto NestJS (si no lo tienes)
   Si aún no tienes un proyecto NestJS, puedes crear uno usando el CLI de NestJS:

```bash
npm i -g @nestjs/cli
nest new nombre-del-proyecto
```

2. Instalar dependencias necesarias
   Instala TypeORM, el driver de PostgreSQL y las utilidades de NestJS para TypeORM:

```bash
yarn add @nestjs/typeorm typeorm pg
@nestjs/typeorm: Integración de TypeORM con NestJS.
```

typeorm: La librería principal de TypeORM.

pg: El driver de PostgreSQL para Node.js.

3. Configurar TypeORM en el módulo principal
   En el archivo app.module.ts, importa y configura TypeORM con PostgreSQL.

```typescript

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: 'localhost', // Host de la base de datos
      port: 5432, // Puerto de PostgreSQL (por defecto es 5432)
      username: 'tu-usuario', // Usuario de la base de datos
      password: 'tu-contraseña', // Contraseña del usuario
      database: 'nombre-de-la-base-de-datos', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de las entidades
      synchronize: true, // Sincroniza el esquema de la base de datos (solo para desarrollo)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
```

4. Crear una entidad
   Las entidades son clases que representan tablas en la base de datos. Crea una entidad, por ejemplo, User.

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

Guarda esta entidad en un archivo, por ejemplo, src/user/user.entity.ts.

5. Crear un módulo y un servicio para la entidad
   Crea un módulo y un servicio para manejar la lógica relacionada con la entidad User.

Genera un módulo y un servicio usando el CLI de NestJS:

```bash

nest generate module user
nest generate service user
```

En el archivo user.module.ts, importa TypeOrmModule.forFeature([User]) para registrar la entidad:

```typescript

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra la entidad User
  providers: [UserService],
})
export class UserModule {
}
```

En el archivo user.service.ts, inyecta el repositorio de TypeORM para interactuar con la base de datos:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
```

6. Crear un controlador para la entidad
   Genera un controlador para manejar las solicitudes HTTP relacionadas con la entidad User.

Genera un controlador usando el CLI de NestJS:

```bash

nest generate controller user
```

En el archivo user.controller.ts, inyecta el servicio y define las rutas:

```typescript

import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
```

7. Configurar la base de datos PostgreSQL
   Asegúrate de tener PostgreSQL instalado y ejecutándose. Luego, crea una base de datos con el nombre que especificaste
   en la configuración de TypeORM.

```bash
createdb nombre-de-la-base-de-datos
```

8. Ejecutar la aplicación
   Finalmente, ejecuta tu aplicación NestJS:

```bash
yarn start:dev
```

Resumen
Instala las dependencias necesarias: @nestjs/typeorm, typeorm, y pg.

Configura TypeORM en app.module.ts.

Crea entidades para representar las tablas de la base de datos.

Usa TypeOrmModule.forFeature([Entity]) para registrar las entidades en los módulos.

Inyecta el repositorio de TypeORM en los servicios para interactuar con la base de datos.

Crea controladores para manejar las solicitudes HTTP.

Con estos pasos, habrás integrado TypeORM con PostgreSQL en tu proyecto NestJS. ¡Ahora puedes comenzar a construir tu
aplicación con una base de datos robusta! 🚀

## MONGO en NestJS

1. Crear un proyecto NestJS (si no lo tienes)
   Si aún no tienes un proyecto NestJS, puedes crear uno usando el CLI de NestJS:

```bash
npm i -g @nestjs/cli
```

```bash
nest new nombre-del-proyecto
```

2. Instalar dependencias necesarias
   Instala TypeORM, el driver de MongoDB y las utilidades de NestJS para TypeORM:

```bash
yarn add @nestjs/typeorm typeorm mongodb
```

@nestjs/typeorm: Integración de TypeORM con NestJS.

typeorm: La librería principal de TypeORM.

mongodb: El driver de MongoDB para Node.js.

3. Configurar TypeORM en el módulo principal
   En el archivo app.module.ts, importa y configura TypeORM con MongoDB.

```typescript

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb', // Tipo de base de datos
      url: 'mongodb://localhost:27017/nombre-de-la-base-de-datos', // URL de conexión
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de las entidades
      synchronize: true, // Sincroniza el esquema de la base de datos (solo para desarrollo)
      useUnifiedTopology: true, // Usar el nuevo motor de topología de MongoDB
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
```

4. Crear una entidad
   En MongoDB, las entidades representan colecciones. Crea una entidad, por ejemplo, User.

```typescript

import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

Guarda esta entidad en un archivo, por ejemplo, src/user/user.entity.ts.

5. Crear un módulo y un servicio para la entidad
   Crea un módulo y un servicio para manejar la lógica relacionada con la entidad User.

Genera un módulo y un servicio usando el CLI de NestJS:

```bash
nest generate module user
```

nest generate service user
En el archivo user.module.ts, importa TypeOrmModule.forFeature([User]) para registrar la entidad:

```typescript

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra la entidad User
  providers: [UserService],
})
export class UserModule {
}
```

En el archivo user.service.ts, inyecta el repositorio de TypeORM para interactuar con la base de datos:

```typescript

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
```

6. Crear un controlador para la entidad
   Genera un controlador para manejar las solicitudes HTTP relacionadas con la entidad User.

Genera un controlador usando el CLI de NestJS:

```bash
nest generate controller user
```

En el archivo user.controller.ts, inyecta el servicio y define las rutas:

```typescript

import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
```

7. Configurar la base de datos MongoDB
   Asegúrate de tener MongoDB instalado y ejecutándose. Si no lo tienes, puedes instalarlo siguiendo la documentación
   oficial de MongoDB.

Inicia MongoDB en tu sistema.

Crea una base de datos (si no existe, se creará automáticamente al conectarse).

8. Ejecutar la aplicación
   Finalmente, ejecuta tu aplicación NestJS:

```bash
yarn start:dev
```

Resumen
Instala las dependencias necesarias: @nestjs/typeorm, typeorm, y mongodb.

Configura TypeORM en app.module.ts para conectarse a MongoDB.

Crea entidades para representar las colecciones de MongoDB.

Usa TypeOrmModule.forFeature([Entity]) para registrar las entidades en los módulos.

Inyecta el repositorio de TypeORM en los servicios para interactuar con la base de datos.

Crea controladores para manejar las solicitudes HTTP.

Con estos pasos, habrás integrado TypeORM con MongoDB en tu proyecto NestJS. ¡Ahora puedes comenzar a construir tu
aplicación con una base de datos NoSQL robusta! 🚀