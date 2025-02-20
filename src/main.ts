import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Para que el validador sea global
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar cors
  app.enableCors();

  // Limitar el tamanio del payload
  app.use(json({ limit: '5mb' }));

  // Versionamiento del API
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation Nest API')
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documentFactory);

  console.log('__ENV', process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
