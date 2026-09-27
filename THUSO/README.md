# SafeHer — Full-Stack SOS Emergency System

This build preserves the supplied SafeHer design and replaces the prototype-only `localStorage` data layer with a Node.js/Express/MongoDB API.

## Features
- MongoDB user accounts with bcrypt password hashes and JWT login
- User-scoped trusted contacts (maximum 2, enforced by the API)
- Contacts persist across refresh/logout/login
- Browser geolocation + Leaflet/OpenStreetMap
- SOS activation works with 0, 1 or 2 contacts
- SOS activation/deactivation/history persisted in MongoDB
- Profile and password changes
- Alert generation architecture without falsely claiming SMS/WhatsApp delivery
- Helmet, CORS, auth/SOS rate limits, validation, protected routes
- Render deployment config and GitHub Pages-compatible frontend API configuration

## Local setup
1. Install Node.js 18+ and MongoDB, or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open `http://localhost:5000`.

Serving the frontend from Express locally avoids CORS and gives geolocation a localhost secure-context exception.

## Deploy: Render + MongoDB Atlas + GitHub Pages
1. Push this repository to GitHub.
2. Create MongoDB Atlas and copy its connection string.
3. Create a Render Web Service from the repository (`npm install`, `npm start`).
4. In Render set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN=https://YOUR_USERNAME.github.io` (or your exact Pages origin).
5. After Render provides the API URL, edit `client/api.js` and replace `https://YOUR-RENDER-SERVICE.onrender.com`.
6. Deploy the contents of `client/` to GitHub Pages. A simple option is to use a `docs/` publishing folder or a Pages Actions workflow.
7. Test `/api/health` on Render, then register/login on Pages.

## Important safety behavior
SafeHer does **not** claim police or trusted contacts were contacted unless a real provider/integration confirms it. The current notification service generates the emergency message and records `generated-not-delivered`. Integrate an authorized SMS/WhatsApp/email provider later.

## Test workflow
Register → Login → Add 2 contacts → Refresh → verify contacts persist → Activate SOS → allow GPS → verify map/record → Deactivate → check SOS History → Logout/login → verify data persists. Repeat SOS with 0 and 1 contact.
