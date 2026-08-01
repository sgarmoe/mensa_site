// loadEnv.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url); //asgn abs path of env to filename
const __dirname = path.dirname(__filename); //get abs path of env asgn to dirname

// Load .env from the project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
