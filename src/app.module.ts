import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'mongodb', // Tipo de base de datos
      authSource: 'admin',
      username: 'rbt_dba',
      password: 'rbt_pass',
      url: 'mongodb://rbt_dba:rbt_pass@45.79.26.15:27017/nest_udemy_db', // URL de conexión
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de las entidades
      synchronize: true, // Sincroniza el esquema de la base de datos (solo para desarrollo)
      useUnifiedTopology: true, // Usar el nuevo motor de topología de MongoDB
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
