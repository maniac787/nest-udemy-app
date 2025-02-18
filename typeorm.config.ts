import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MyCustomLogger } from './src/utils/custom.logger';

export const typeOrmConfigAsync = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  authSource: configService.get<string>('DATABASE_AUTH_SOURCE'),
  type: 'mongodb', // Tipo de base de datos
  url: configService.get<string>('DATABASE_URL'), // URL de conexión
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de las entidades
  synchronize: true, // Sincronizar esquemas (solo para desarrollo)
  logging: true, // Habilitar logs
  logger: new MyCustomLogger(), // Logger personalizado
  // useUnifiedTopology: true, // Opción recomendada para MongoDB
});
