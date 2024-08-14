export const DATABASE_CONFIG = 'database-config';

export interface DatabaseConfig {
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
}

export default (): DatabaseConfig => ({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
});
