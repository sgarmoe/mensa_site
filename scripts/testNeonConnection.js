import { pool, query } from '../app/backend/config/neonClient.js';

try {
  const { rows: [row] } = await query(
    'SELECT current_database() AS database, current_user AS role'
  );
  console.log(`Connected to Neon database "${row.database}" as "${row.role}".`);
} catch (error) {
  console.error('Neon connection test failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
