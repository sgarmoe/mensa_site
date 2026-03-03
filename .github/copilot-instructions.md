# Copilot / AI agent instructions for mensa_site

Keep responses concise and actionable. Focus changes inside the `app/` tree and prefer minimal, well-scoped edits.

- Project type: Next.js (app directory), ESM (`type: module` in `package.json`). Run locally with `npm run dev`.
- Key runtime: Node server-side code lives under `app/backend/` and is exposed via Next API routes in `app/api/*/route.js`.

Architecture quickpeek
- `app/api/*/route.js` — thin route handlers that parse query params and delegate to controllers in `app/backend/controllers` (e.g., `populateRostersController.js`).
- `app/backend/controllers/*` — orchestrate higher-level flows and call `helpers` + `lib`.
- `app/backend/helpers/*` — domain logic that transforms/normalizes data (e.g., `populateRosters.js`, `processTransactions.js`).
- `app/backend/lib/*` — external service adapters (Sleeper API, Mongo read/write). Example: `fetchSleeperData.js` calls Sleeper endpoints; `fetchMongoNFLData.js` reads `nfl_players` collection.
- `app/backend/config/*` — environment and season config. Important: `loadEnv.js` loads `.env` from repository root.

Important patterns & conventions (do not invent alternatives unless necessary)
- Year/season is the primary selector. Many endpoints expect `year` query param (Number). See `app/api/populateRosters/route.js` and `app/api/populateRecentTransactions/route.js`.
- Config precedence: environment variables (root `.env`) → `app/backend/config/seasons.js` maps years to `process.env.LEAGUE_ID_<YEAR>` and `regularWeeks`.
- Database: uses native `mongodb` driver in `app/backend/config/mongoClient.js`. Use `connectToDatabase(dbName)` to get `db` and target collection names like `nfl_players`.
- Player lookups: helpers expect Sleeper player IDs; lookup against the `nfl_players` collection using the `player_id` or `_id` fields returned by `fetchAndStoreNFLData.js`.

Run / debug / common commands
- Local development: `npm run dev` (Next dev, ports default to 3000).
- Build: `npm run build`; Start: `npm run start` (production build).
- Lint: `npm run lint`.
- Test manual API call examples:
  - Populate rosters: `curl "http://localhost:3000/api/populateRosters?year=2026"`
  - Recent transactions: `curl "http://localhost:3000/api/populateRecentTransactions?year=2026&week=3"`

Environment & secrets
- `.env` is loaded via `app/backend/config/loadEnv.js` (path resolved relative to that file). Key env vars used:
  - `MONGODB_URI` — required for DB connection.
  - `LEAGUE_ID_2023`, `LEAGUE_ID_2024`, `LEAGUE_ID_2025`, `LEAGUE_ID_2026` — used by `seasons.js`.

Editing guidance & safe-change checklist
- Prefer controller/helper edits over touching API routes unless modifying URL/param contracts.
- When adding features that query Mongo, reuse `connectToDatabase()` and the `nfl_players` collection naming.
- When altering season/league config, update `app/backend/config/seasons.js` or the appropriate `LEAGUE_ID_<YEAR>` env var.
- Aim for idempotent DB operations in `fetchAndStoreNFLData.js` (it currently deletes then inserts).

Files to inspect for examples
- Route & controller: `app/api/populateRosters/route.js` → `app/backend/controllers/populateRostersController.js`
- Sleeper adapter: `app/backend/lib/fetchSleeperData.js`
- Mongo client: `app/backend/config/mongoClient.js` and player store: `app/backend/lib/fetchAndStoreNFLData.js`

When unsure, ask for one of:
- Which endpoint to exercise and example query params
- Whether to change `seasons.js` vs add a new env var
- Permission to run local `npm run dev` and exercise endpoints

If this file is out of date, tell me which section needs more examples or which new files to reference.
