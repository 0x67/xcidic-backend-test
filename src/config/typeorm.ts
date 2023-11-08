import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { join } from 'path';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: [join(__dirname, '..', '..', '/**/*.entity{.ts,.js}')],
  migrations: [
    join(__dirname, '..', '..', 'src/database/migrations/*{.ts,.js}'),
  ],
  migrationsRun: false,
});

export default dataSource;
