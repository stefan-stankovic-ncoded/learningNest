export const DATABASE_CONFIG = 'database-config';

export interface DatabaseConfig {
  user: string;
  password: string;
}

export default () => ({
  'database-config': {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
});
