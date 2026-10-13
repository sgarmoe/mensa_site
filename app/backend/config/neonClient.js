import pg from 'pg';
import './loadEnv.js';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Cannot access Neon DATABASE_URL');
}

export const pool = new Pool({ connectionString });

pool.on('error', (error) => {
  console.error('Unexpected Neon PostgreSQL client error', error);
});

export function query(text, values) {
  return pool.query(text, values);
}
