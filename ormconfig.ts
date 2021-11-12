import { env } from '@config/index';

export = {
  name: 'default',
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PSWD,
  database: env.DB_BASE,
  synchronize: false,
  logging: true,
  entities: ['src/db/models/*.ts'],
  migrations: ['src/db/migration/*.ts'],
  cli: {
    entitiesDir: 'src/db/models',
    migrationsDir: 'src/db/migration',
  },
};
