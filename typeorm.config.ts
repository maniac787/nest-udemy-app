import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/auth/entities/user.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  authSource: 'admin',
  type: 'mongodb', // Tipo de base de datos
  url: 'mongodb://rbt_dba:rbt_pass@45.79.26.15:27017/nest_udemy_db', // URL de conexión,
  entities: [User], // Entidades
  synchronize: true, // Sincronizar esquemas (solo para desarrollo)
  logging: true, // Habilitar logs
  // useUnifiedTopology: true, // Opción recomendada para MongoDB
};

export default typeOrmConfig;
