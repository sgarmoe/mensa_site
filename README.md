
Personal project working with:
    -JavaScript
    -Next.JS
    -React
    -HTML 
    -CSS
    -MongoDB
    
MongoDB is used to store all NFL player history and Sleeper API to match with current player data.

Website displays records for an ongoing fantasy football website for which I am the commisioner. 

Features include (or will include) a home page, rosters, weekly matchups, all-time statistics, etc. 

All critiques or compliments are welcome, as the main goal is to improve my development skills.

## Database connections

MongoDB remains the database used by the existing NFL data features. Neon PostgreSQL support is added as an additional connection; no data has been migrated.

For local development, set `DATABASE_URL` in the root `.env` file using the connection string for the Neon `MENSA` project's `local-development` branch, database `neondb`, and role `neondb_owner`. Keep this value server-side; do not expose it through a `NEXT_PUBLIC_` variable. See `.env.example` for the environment variable names.

Run `npm run test:neon` to verify the PostgreSQL connection.
