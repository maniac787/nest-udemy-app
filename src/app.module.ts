import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { typeOrmConfigAsync } from '../typeorm.config';
import { EventMailModule } from './event-mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    VideosModule,
    AwardsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importar ConfigModule
      inject: [ConfigService], // Inyectar ConfigService
      useFactory: typeOrmConfigAsync, // Usar la configuración asíncrona
    }),
    TypeOrmModule.forFeature([User]),
    EventEmitterModule.forRoot(), //Manejo de eventos
    EventMailModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
