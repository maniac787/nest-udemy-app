import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MyCustomLogger } from './src/utils/custom.logger';

const typeOrmConfig: TypeOrmModuleOptions = {
  authSource: 'admin',
  type: 'mongodb', // Tipo de base de datos
  url: 'mongodb://rbt_dba:rbt_pass@45.79.26.15:27017/nest_udemy_db', // URL de conexión,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Rutas de las entidades
  synchronize: true, // Sincronizar esquemas (solo para desarrollo)
  // logging: true, // Habilitar logs
  logging: true, // Solo logs de consultas y errores
  logger: new MyCustomLogger(),
  // useUnifiedTopology: true, // Opción recomendada para MongoDB
};

export default typeOrmConfig;
