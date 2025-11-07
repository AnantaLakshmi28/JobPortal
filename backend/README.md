Backend setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install deps: `npm install` in backend folder.
3. Run dev: `npm run dev` (requires nodemon) or `npm start`.

API endpoints:
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET /api/jobs (auth)
- POST /api/jobs (auth)
